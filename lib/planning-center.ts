import { logger } from "./logger";

// Planning Center JSON:API response types
interface PCGroupAttributes {
  name: string;
  description: string | null;
  header_image: {
    original: string;
    medium: string;
    thumbnail: string;
  } | null;
  public_church_center_web_url: string | null;
  schedule: string | null;
  location: string | null;
}

interface PCGroupData {
  id: string;
  type: "Group";
  attributes: PCGroupAttributes;
}

interface PCGroupsResponse {
  data: PCGroupData[];
  meta: {
    total_count: number;
    count: number;
  };
}

// Calendar Event types
interface PCEventAttributes {
  name: string;
  description: string | null;
  image_url: string | null;
  starts_at: string;
  ends_at: string;
  visible_in_church_center: boolean;
}

interface PCEventData {
  id: string;
  type: "Event";
  attributes: PCEventAttributes;
}

interface PCEventsResponse {
  data: PCEventData[];
  meta: {
    total_count: number;
    count: number;
  };
}

// Simplified event type for components
export interface CalendarEvent {
  id: string;
  name: string;
  description: string;
  image: string | null;
  startsAt: Date;
  endsAt: Date;
  church_center_url?: string;
}

// Simplified group type for components
export interface Group {
  id: string;
  name: string;
  description: string;
  image: string | null;
  url: string | null;
  schedule: string | null;
  location: string | null;
}

const PC_GROUPS_API = "https://api.planningcenteronline.com/groups/v2";
const PC_CALENDAR_API = "https://api.planningcenteronline.com/calendar/v2";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + "...";
  }
  return truncated + "...";
}

function getAuthHeader(): string {
  const clientId = process.env.PC_CLIENT_ID;
  const secret = process.env.PC_SECRET;

  if (!clientId || !secret) {
    throw new Error("Planning Center credentials not configured");
  }

  return `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`;
}

export async function getPublicGroups(): Promise<Group[]> {
  try {
    const response = await fetch(`${PC_GROUPS_API}/groups?filter=public`, {
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      logger.error("Planning Center API error", {
        status: response.status,
        statusText: response.statusText,
      });
      return [];
    }

    const data: PCGroupsResponse = await response.json();

    return data.data
      .filter((group) => group.attributes.public_church_center_web_url)
      .map((group) => ({
        id: group.id,
        name: group.attributes.name,
        description: truncateText(
          stripHtml(group.attributes.description || ""),
          200
        ),
        image: group.attributes.header_image?.medium || null,
        url: group.attributes.public_church_center_web_url,
        schedule: group.attributes.schedule,
        location: group.attributes.location,
      }));
  } catch (error) {
    logger.error("Failed to fetch Planning Center groups", { error });
    return [];
  }
}

interface PCEventInstanceAttributes {
  name: string;
  starts_at: string;
  ends_at: string;
  church_center_url: string;
  location: string | null;
}

interface PCEventInstanceData {
  id: string;
  type: "EventInstance";
  attributes: PCEventInstanceAttributes;
  relationships: {
    event: {
      data: {
        type: "Event";
        id: string;
      };
    };
  };
}

interface PCIncludedEvent {
  id: string;
  type: "Event";
  attributes: {
    name: string;
    image_url: string | null;
  };
}

interface PCEventInstancesResponse {
  data: PCEventInstanceData[];
  included?: PCIncludedEvent[];
}

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  try {
    const response = await fetch(
      `${PC_CALENDAR_API}/event_instances?filter=future&order=starts_at&per_page=6&where[visible_in_church_center]=true&include=event`,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      logger.error("Planning Center Calendar API error", {
        status: response.status,
        statusText: response.statusText,
      });
      return [];
    }

    const data: PCEventInstancesResponse = await response.json();

    // Create a map of event IDs to their image URLs
    const eventImages = new Map<string, string | null>();
    if (data.included) {
      for (const event of data.included) {
        if (event.type === "Event") {
          eventImages.set(event.id, event.attributes.image_url);
        }
      }
    }

    return data.data.slice(0, 6).map((instance) => {
      const eventId = instance.relationships.event.data.id;

      return {
        id: instance.id,
        name: instance.attributes.name.trim(),
        description: "",
        image: eventImages.get(eventId) || null,
        startsAt: new Date(instance.attributes.starts_at),
        endsAt: new Date(instance.attributes.ends_at),
        church_center_url: instance.attributes.church_center_url,
      };
    });
  } catch (error) {
    logger.error("Failed to fetch Planning Center events", { error });
    return [];
  }
}
