import type { Timestamp } from "firebase/firestore";

export type ContentType = "blog" | "sermon" | "song" | "event";

export type ContentStatus = "draft" | "published";

export type ContentLanguage = "ru" | "en";

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface Content {
  id: string;
  contentType: ContentType;
  slug: string;

  // Core content
  title: string;
  content: string; // HTML from TipTap
  excerpt?: string;

  // SEO
  seo: SEOData;

  // Media
  coverImage?: string;

  // Taxonomy
  tags: string[];

  // Language
  language: ContentLanguage;

  // Authorship
  author: string;
  authorId: string;

  // Status & dates
  status: ContentStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;

  // Search indexing
  searchableText: string;
}

export interface ContentInput {
  contentType: ContentType;
  title: string;
  content: string;
  excerpt?: string;
  seo: SEOData;
  coverImage?: string;
  tags: string[];
  status: ContentStatus;
  language: ContentLanguage;
}

export interface ContentFilters {
  contentType?: ContentType;
  status?: ContentStatus;
  language?: ContentLanguage;
  tag?: string;
  search?: string;
  limit?: number;
}

// Calendar Event types
export type RepeatType = "none" | "weekly" | "custom";

export interface RepeatSettings {
  repeatType: RepeatType;
  weeklyDays?: number[]; // 0-6 (Sunday-Saturday) for weekly repeats
  customDates?: string[]; // ISO date strings for custom repeats
  recurrenceEndDate?: string; // ISO date string, recurrence stops after this date
}

export interface CalendarEvent extends Content {
  contentType: "event";
  eventDate: Timestamp; // Primary event date/time
  endDate?: Timestamp; // Optional end date/time
  isAllDay: boolean;
  repeatSettings: RepeatSettings;
}

export interface CalendarEventInput extends ContentInput {
  contentType: "event";
  eventDate: Date; // JS Date for form handling
  endDate?: Date;
  isAllDay: boolean;
  repeatSettings: RepeatSettings;
  canonicalUrl?: string;
}

// Extended CalendarEvent with computed next occurrence for recurring events
export interface CalendarEventWithNextOccurrence extends CalendarEvent {
  canonicalUrl?: string;
  nextOccurrence: { seconds: number; nanoseconds: number } | null;
  isRecurringOccurrence: boolean;
}
