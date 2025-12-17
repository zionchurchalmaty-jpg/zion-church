import type { Timestamp } from "firebase/firestore";

export type ContentType = "blog" | "song";

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
