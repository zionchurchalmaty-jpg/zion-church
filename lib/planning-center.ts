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

const PC_API_BASE = "https://api.planningcenteronline.com/groups/v2";

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
    const response = await fetch(`${PC_API_BASE}/groups?filter=public`, {
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
        description: truncateText(stripHtml(group.attributes.description || ""), 200),
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
