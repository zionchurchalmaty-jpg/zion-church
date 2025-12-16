import type { Timestamp } from "firebase/firestore";

export type ContentType = "blog" | "song";

export type ContentStatus = "draft" | "published";

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
  category?: string;

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
  category?: string;
  status: ContentStatus;
}

export interface ContentFilters {
  contentType?: ContentType;
  status?: ContentStatus;
  tag?: string;
  search?: string;
  limit?: number;
}
