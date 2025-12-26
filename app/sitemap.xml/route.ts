import { getPublishedContent } from "@/lib/firestore/content";
import type { Content, ContentLanguage } from "@/lib/firestore/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.goodnewsbible.org";

const LOCALES: ContentLanguage[] = ["ru"];
const DEFAULT_LOCALE: ContentLanguage = "ru";

function getLocalePrefix(locale: ContentLanguage): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

function generateSitemapXml(entries: SitemapEntry[]): string {
  const urlEntries = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

function getLastModified(content: Content): string {
  const timestamp =
    content.updatedAt || content.publishedAt || content.createdAt;
  if (timestamp?.toDate) {
    return timestamp.toDate().toISOString();
  }
  return new Date().toISOString();
}

export async function GET() {
  const now = new Date().toISOString();

  // Static pages for all locales
  const staticPagePaths = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/blog", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/songs", changeFrequency: "weekly" as const, priority: 0.8 },
    {
      path: "/legal/privacy-policy",
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      path: "/legal/terms-of-service",
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  const staticPages: SitemapEntry[] = LOCALES.flatMap((locale) =>
    staticPagePaths.map((page) => ({
      url: `${BASE_URL}${getLocalePrefix(locale)}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Blog posts from Firebase - filtered by language
  const blogPosts = await getPublishedContent("blog");
  const blogEntries: SitemapEntry[] = blogPosts.map((post) => ({
    url: `${BASE_URL}${getLocalePrefix(post.language)}/blog/${post.slug || post.id}`,
    lastModified: getLastModified(post),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Songs from Firebase - filtered by language
  const songs = await getPublishedContent("song");
  const songEntries: SitemapEntry[] = songs.map((song) => ({
    url: `${BASE_URL}${getLocalePrefix(song.language)}/songs/${song.slug || song.id}`,
    lastModified: getLastModified(song),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const allEntries = [...staticPages, ...blogEntries, ...songEntries];
  const sitemap = generateSitemapXml(allEntries);

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
