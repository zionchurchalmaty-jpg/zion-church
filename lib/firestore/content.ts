import { getNextOccurrence } from "@/lib/event-recurrence";
import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit as firestoreLimit,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import slugify from "slugify";
import type {
  CalendarEvent,
  CalendarEventInput,
  CalendarEventWithNextOccurrence,
  Content,
  ContentFilters,
  ContentInput,
  ContentType,
} from "./types";

const CONTENT_COLLECTION = "content";

// Helper to check if Firebase is ready
function ensureFirebase() {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase is not configured. Set environment variables.");
    return false;
  }
  return true;
}

/**
 * Strip HTML tags from content to create searchable plain text
 */
function stripHtml(html: string): string {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, " ");
  // Decode HTML entities
  const decoded = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
  // Normalize whitespace
  return decoded.replace(/\s+/g, " ").trim();
}

/**
 * Generate searchable text from title and content
 */
function generateSearchableText(title: string, htmlContent: string): string {
  const plainText = stripHtml(htmlContent);
  return `${title} ${plainText}`.toLowerCase();
}

/**
 * Generate URL-friendly slug from title
 * Uses slugify package which handles Cyrillic and other non-ASCII characters
 */
function generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: "ru",
  });
}

/**
 * Remove undefined values from an object (Firestore doesn't accept undefined)
 */
function removeUndefined(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value === undefined) {
      continue;
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = removeUndefined(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Serialize Firestore document data for passing to Client Components
 * Converts Timestamps to plain objects with seconds/nanoseconds
 */
function serializeForClient<T>(data: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(data)) {
    const value = data[key];
    if (value instanceof Timestamp) {
      // Convert Timestamp to plain object
      result[key] = { seconds: value.seconds, nanoseconds: value.nanoseconds };
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = serializeForClient(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        item && typeof item === "object"
          ? serializeForClient(item as Record<string, unknown>)
          : item,
      );
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

/**
 * Get all published content of a specific type (for public pages)
 */
export async function getPublishedContent(
  contentType: ContentType,
): Promise<Content[]> {
  if (!ensureFirebase() || !db) return [];

  try {
    const q = query(
      collection(db, CONTENT_COLLECTION),
      where("contentType", "==", contentType),
      where("status", "==", "published"),
      orderBy("updatedAt", "desc"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) =>
      serializeForClient<Content>({ id: doc.id, ...doc.data() }),
    );
  } catch (error) {
    console.error("Error fetching published content:", error);
    return [];
  }
}

/**
 * Get a single published content item by slug (for public pages)
 */
export async function getPublishedContentBySlug(
  contentType: ContentType,
  slug: string,
): Promise<Content | null> {
  if (!ensureFirebase() || !db) return null;

  try {
    const q = query(
      collection(db, CONTENT_COLLECTION),
      where("contentType", "==", contentType),
      where("slug", "==", slug),
      where("status", "==", "published"),
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return serializeForClient<Content>({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error("Error fetching content by slug:", error);
    return null;
  }
}

/**
 * Get all content with optional filters (for admin pages)
 */
export async function getAllContent(
  filters: ContentFilters = {},
): Promise<Content[]> {
  if (!ensureFirebase() || !db) return [];

  try {
    let q = query(collection(db, CONTENT_COLLECTION));

    // Apply filters
    const constraints = [];

    if (filters.contentType) {
      constraints.push(where("contentType", "==", filters.contentType));
    }

    if (filters.status) {
      constraints.push(where("status", "==", filters.status));
    }

    if (filters.tag) {
      constraints.push(where("tags", "array-contains", filters.tag));
    }

    // Add ordering
    constraints.push(orderBy("updatedAt", "desc"));

    if (filters.limit) {
      constraints.push(firestoreLimit(filters.limit));
    }

    q = query(collection(db, CONTENT_COLLECTION), ...constraints);

    const snapshot = await getDocs(q);
    let results = snapshot.docs.map((doc) =>
      serializeForClient<Content>({ id: doc.id, ...doc.data() }),
    );

    // Client-side search filtering (Firestore doesn't support full-text search)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter((item) =>
        item.searchableText.includes(searchLower),
      );
    }

    return results;
  } catch (error) {
    console.error("Error fetching all content:", error);
    return [];
  }
}

/**
 * Get a single content item by ID (for admin edit pages)
 */
export async function getContentById(id: string): Promise<Content | null> {
  if (!ensureFirebase() || !db) return null;

  const docRef = doc(db, CONTENT_COLLECTION, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return serializeForClient<Content>({ id: snapshot.id, ...snapshot.data() });
}

/**
 * Create new content
 */
export async function createContent(
  input: ContentInput,
  authorId: string,
  authorName: string,
): Promise<string> {
  if (!ensureFirebase() || !db) throw new Error("Firebase not configured");

  const slug = generateSlug(input.title);
  const searchableText = generateSearchableText(input.title, input.content);

  // Process content fields first, then add timestamp sentinels separately
  // (serverTimestamp() sentinels break if passed through removeUndefined)
  const contentFields = removeUndefined({
    ...input,
    slug,
    author: authorName,
    authorId,
    searchableText,
  });

  const docData = {
    ...contentFields,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: input.status === "published" ? serverTimestamp() : null,
  };

  const docRef = await addDoc(collection(db, CONTENT_COLLECTION), docData);
  return docRef.id;
}

/**
 * Update existing content
 */
export async function updateContent(
  id: string,
  input: ContentInput,
): Promise<void> {
  if (!ensureFirebase() || !db) throw new Error("Firebase not configured");

  const docRef = doc(db, CONTENT_COLLECTION, id);
  const existingDoc = await getDoc(docRef);

  if (!existingDoc.exists()) {
    throw new Error("Content not found");
  }

  const existingData = existingDoc.data();
  const slug = generateSlug(input.title);
  const searchableText = generateSearchableText(input.title, input.content);

  // Process content fields first, then add timestamp sentinels separately
  const contentFields = removeUndefined({
    ...input,
    slug,
    searchableText,
  });

  const updateData = {
    ...contentFields,
    updatedAt: serverTimestamp(),
    // Set publishedAt if publishing for first time
    publishedAt:
      input.status === "published" && !existingData.publishedAt
        ? serverTimestamp()
        : existingData.publishedAt,
  };

  await updateDoc(docRef, updateData);
}

/**
 * Delete content
 */
export async function deleteContent(id: string): Promise<void> {
  if (!ensureFirebase() || !db) throw new Error("Firebase not configured");

  const docRef = doc(db, CONTENT_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Get content counts for dashboard
 */
export async function getContentCounts(): Promise<{
  blog: { total: number; published: number; draft: number };
  song: { total: number; published: number; draft: number };
  event: { total: number; published: number; draft: number };
}> {
  const defaultCounts = {
    blog: { total: 0, published: 0, draft: 0 },
    song: { total: 0, published: 0, draft: 0 },
    event: { total: 0, published: 0, draft: 0 },
  };

  if (!ensureFirebase() || !db) return defaultCounts;

  const snapshot = await getDocs(collection(db, CONTENT_COLLECTION));

  const counts = {
    blog: { total: 0, published: 0, draft: 0 },
    song: { total: 0, published: 0, draft: 0 },
    event: { total: 0, published: 0, draft: 0 },
  };

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const type = data.contentType as "blog" | "song" | "event";
    const status = data.status as "published" | "draft";

    if (counts[type]) {
      counts[type].total++;
      counts[type][status]++;
    }
  });

  return counts;
}

// ============================================
// Calendar Event Functions
// ============================================

/**
 * Get published events, optionally filtered to upcoming only
 * Sorted by eventDate ascending (soonest first)
 * For recurring events, calculates next occurrence and sorts by that
 */
export async function getPublishedEvents(
  upcomingOnly: boolean = true,
): Promise<CalendarEventWithNextOccurrence[]> {
  if (!ensureFirebase() || !db) return [];

  try {
    const now = new Date();
    const nowTimestamp = Timestamp.now();

    if (!upcomingOnly) {
      // Fetch all published events without date filter
      const q = query(
        collection(db, CONTENT_COLLECTION),
        where("contentType", "==", "event"),
        where("status", "==", "published"),
        orderBy("eventDate", "asc"),
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => {
        const event = serializeForClient<CalendarEvent>({
          id: doc.id,
          ...doc.data(),
        });
        const nextOcc = getNextOccurrence(
          event.eventDate as { seconds: number; nanoseconds: number },
          event.repeatSettings,
          now,
        );
        return {
          ...event,
          nextOccurrence: nextOcc,
          isRecurringOccurrence: event.repeatSettings.repeatType !== "none",
          canonicalUrl: event.seo?.canonicalUrl || "",
        };
      });
    }

    // For upcomingOnly: fetch all non-recurring events + all recurring events
    // We'll filter client-side to include ongoing multi-day events
    // Query 1: All non-recurring events (filter upcoming/ongoing client-side)
    const nonRecurringQuery = query(
      collection(db, CONTENT_COLLECTION),
      where("contentType", "==", "event"),
      where("status", "==", "published"),
      where("repeatSettings.repeatType", "==", "none"),
      orderBy("eventDate", "asc"),
    );

    // Query 2: All weekly recurring events
    const weeklyQuery = query(
      collection(db, CONTENT_COLLECTION),
      where("contentType", "==", "event"),
      where("status", "==", "published"),
      where("repeatSettings.repeatType", "==", "weekly"),
    );

    // Query 3: All custom recurring events
    const customQuery = query(
      collection(db, CONTENT_COLLECTION),
      where("contentType", "==", "event"),
      where("status", "==", "published"),
      where("repeatSettings.repeatType", "==", "custom"),
    );

    const [nonRecurringSnap, weeklySnap, customSnap] = await Promise.all([
      getDocs(nonRecurringQuery),
      getDocs(weeklyQuery),
      getDocs(customQuery),
    ]);

    const allEvents: CalendarEventWithNextOccurrence[] = [];

    // Process non-recurring events - filter to include upcoming or ongoing events
    nonRecurringSnap.docs.forEach((doc) => {
      const event = serializeForClient<CalendarEvent>({
        id: doc.id,
        ...doc.data(),
      });

      const eventDate = event.eventDate as {
        seconds: number;
        nanoseconds: number;
      };
      const endDate = event.endDate as
        | { seconds: number; nanoseconds: number }
        | null
        | undefined;

      // Include event if:
      // 1. It starts in the future (eventDate >= now), OR
      // 2. It's ongoing (started in past but ends in future or has no end date)
      const eventStartTime = eventDate.seconds * 1000;
      const eventEndTime = endDate ? endDate.seconds * 1000 : eventStartTime;
      const nowTime = now.getTime();

      const isFutureEvent = eventStartTime >= nowTime;
      const isOngoingEvent =
        eventStartTime < nowTime && eventEndTime >= nowTime;

      if (isFutureEvent || isOngoingEvent) {
        allEvents.push({
          ...event,
          nextOccurrence: eventDate,
          isRecurringOccurrence: false,
        });
      }
    });

    // Process recurring events - calculate next occurrence
    [...weeklySnap.docs, ...customSnap.docs].forEach((doc) => {
      const event = serializeForClient<CalendarEvent>({
        id: doc.id,
        ...doc.data(),
      });
      const nextOcc = getNextOccurrence(
        event.eventDate as { seconds: number; nanoseconds: number },
        event.repeatSettings,
        now,
      );

      // Only include if there's a future occurrence
      if (nextOcc) {
        allEvents.push({
          ...event,
          nextOccurrence: nextOcc,
          isRecurringOccurrence: true,
          canonicalUrl: event.seo?.canonicalUrl || "",
        });
      }
    });

    // Sort by next occurrence ascending
    allEvents.sort((a, b) => {
      const aTime = a.nextOccurrence?.seconds ?? 0;
      const bTime = b.nextOccurrence?.seconds ?? 0;
      return aTime - bTime;
    });

    return allEvents;
  } catch (error) {
    console.error("Error fetching published events:", error);
    return [];
  }
}

/**
 * Get upcoming events for the homepage calendar section
 * Returns next N events from today onwards, including recurring events
 */
export async function getUpcomingEvents(
  limitCount: number = 6,
): Promise<CalendarEventWithNextOccurrence[]> {
  if (!ensureFirebase() || !db) return [];

  try {
    // Use getPublishedEvents with upcomingOnly=true and then apply limit
    const allUpcoming = await getPublishedEvents(true);
    return allUpcoming.slice(0, limitCount);
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}

/**
 * Create a new calendar event
 */
export async function createEvent(
  input: CalendarEventInput,
  authorId: string,
  authorName: string,
): Promise<string> {
  if (!ensureFirebase() || !db) throw new Error("Firebase not configured");

  const slug = generateSlug(input.title);
  const searchableText = generateSearchableText(input.title, input.content);

  // Process content fields first, then add timestamps separately
  // (serverTimestamp() and Timestamp sentinels can break if passed through removeUndefined)
  const contentFields = removeUndefined({
    ...input,
    slug,
    author: authorName,
    authorId,
    searchableText,
  });

  const docData = {
    ...contentFields,
    eventDate: Timestamp.fromDate(input.eventDate),
    endDate: input.endDate ? Timestamp.fromDate(input.endDate) : null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: input.status === "published" ? serverTimestamp() : null,
  };

  const docRef = await addDoc(collection(db, CONTENT_COLLECTION), docData);
  return docRef.id;
}

/**
 * Update an existing calendar event
 */
export async function updateEvent(
  id: string,
  input: CalendarEventInput,
): Promise<void> {
  if (!ensureFirebase() || !db) throw new Error("Firebase not configured");

  const docRef = doc(db, CONTENT_COLLECTION, id);
  const existingDoc = await getDoc(docRef);

  if (!existingDoc.exists()) {
    throw new Error("Event not found");
  }

  const existingData = existingDoc.data();
  const slug = generateSlug(input.title);
  const searchableText = generateSearchableText(input.title, input.content);

  // Process content fields first, then add timestamps separately
  const contentFields = removeUndefined({
    ...input,
    slug,
    searchableText,
  });

  const updateData = {
    ...contentFields,
    eventDate: Timestamp.fromDate(input.eventDate),
    endDate: input.endDate ? Timestamp.fromDate(input.endDate) : null,
    updatedAt: serverTimestamp(),
    publishedAt:
      input.status === "published" && !existingData.publishedAt
        ? serverTimestamp()
        : existingData.publishedAt,
  };

  await updateDoc(docRef, updateData);
}
