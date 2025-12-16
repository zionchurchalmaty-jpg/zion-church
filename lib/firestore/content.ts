import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import type {
  Content,
  ContentInput,
  ContentFilters,
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
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Get all published content of a specific type (for public pages)
 */
export async function getPublishedContent(
  contentType: ContentType
): Promise<Content[]> {
  if (!ensureFirebase() || !db) return [];

  try {
    const q = query(
      collection(db, CONTENT_COLLECTION),
      where("contentType", "==", contentType),
      where("status", "==", "published"),
      orderBy("publishedAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Content
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
  slug: string
): Promise<Content | null> {
  if (!ensureFirebase() || !db) return null;

  try {
    const q = query(
      collection(db, CONTENT_COLLECTION),
      where("contentType", "==", contentType),
      where("slug", "==", slug),
      where("status", "==", "published")
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as Content;
  } catch (error) {
    console.error("Error fetching content by slug:", error);
    return null;
  }
}

/**
 * Get all content with optional filters (for admin pages)
 */
export async function getAllContent(
  filters: ContentFilters = {}
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
    let results = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Content
    );

    // Client-side search filtering (Firestore doesn't support full-text search)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter((item) =>
        item.searchableText.includes(searchLower)
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

  return { id: snapshot.id, ...snapshot.data() } as Content;
}

/**
 * Create new content
 */
export async function createContent(
  input: ContentInput,
  authorId: string,
  authorName: string
): Promise<string> {
  if (!ensureFirebase() || !db) throw new Error("Firebase not configured");

  const slug = generateSlug(input.title);
  const searchableText = generateSearchableText(input.title, input.content);
  const now = serverTimestamp();

  const docData = {
    ...input,
    slug,
    author: authorName,
    authorId,
    searchableText,
    createdAt: now,
    updatedAt: now,
    publishedAt: input.status === "published" ? now : null,
  };

  const docRef = await addDoc(collection(db, CONTENT_COLLECTION), docData);
  return docRef.id;
}

/**
 * Update existing content
 */
export async function updateContent(
  id: string,
  input: ContentInput
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

  const updateData: Record<string, unknown> = {
    ...input,
    slug,
    searchableText,
    updatedAt: serverTimestamp(),
  };

  // Set publishedAt if publishing for first time
  if (input.status === "published" && !existingData.publishedAt) {
    updateData.publishedAt = serverTimestamp();
  }

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
}> {
  const defaultCounts = {
    blog: { total: 0, published: 0, draft: 0 },
    song: { total: 0, published: 0, draft: 0 },
  };

  if (!ensureFirebase() || !db) return defaultCounts;

  const snapshot = await getDocs(collection(db, CONTENT_COLLECTION));

  const counts = {
    blog: { total: 0, published: 0, draft: 0 },
    song: { total: 0, published: 0, draft: 0 },
  };

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const type = data.contentType as "blog" | "song";
    const status = data.status as "published" | "draft";

    if (counts[type]) {
      counts[type].total++;
      counts[type][status]++;
    }
  });

  return counts;
}
