import { Link } from "@/i18n/navigation";
import {
  getContentById,
  getPublishedContentBySlug,
} from "@/lib/firestore/content";
import sanitize from "sanitize-html";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ViewCounter } from "@/components/blog/view-counter";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

// Revalidate every 5 minutes
export const revalidate = 300;

// Helper to convert Firestore timestamp (may be object with _seconds or Timestamp instance)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toDate(timestamp: any): Date | null {
  if (!timestamp) return null;
  // If it's a Firestore Timestamp instance with toDate method
  if (typeof timestamp.toDate === "function") {
    return timestamp.toDate();
  }
  // If it's a plain object with _seconds (serialized Timestamp)
  if (timestamp._seconds !== undefined) {
    return new Date(timestamp._seconds * 1000);
  }
  // If it's already a Date
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return null;
}

function formatDate(timestamp: unknown, locale: string): string {
  const date = toDate(timestamp);
  if (!date) return "";
  return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getISOString(timestamp: unknown): string | undefined {
  const date = toDate(timestamp);
  return date?.toISOString();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  // Try by slug first, then by ID (for legacy posts with empty slugs)
  let post = await getPublishedContentBySlug("blog", slug);
  if (!post) {
    const byId = await getContentById(slug);
    if (byId && byId.contentType === "blog" && byId.status === "published") {
      post = byId;
    }
  }

  if (!post) {
    return {
      title: "Post Not Found - Церкось Сион",
    };
  }

  const title = post.seo.metaTitle || post.title;
  const description = post.seo.metaDescription || post.excerpt || "";
  const ogImage = post.seo.ogImage || post.coverImage;

  return {
    title: `${title} - Церкось Сион Blog`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: getISOString(post.publishedAt),
      authors: [post.author],
      tags: post.tags,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    ...(post.seo.canonicalUrl && {
      alternates: { canonical: post.seo.canonicalUrl },
    }),
    ...(post.seo.noIndex && { robots: { index: false } }),
  };
}

// Server-side HTML sanitization
function sanitizeHtml(html: string): string {
  return sanitize(html, {
    allowedTags: sanitize.defaults.allowedTags.concat(['img', 'iframe']),
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'class'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'allow', 'scrolling'],
      '*': ['class', 'style'],
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");

  // Try by slug first, then by ID (for legacy posts with empty slugs)
  let post = await getPublishedContentBySlug("blog", slug);
  if (!post) {
    const byId = await getContentById(slug);
    if (byId && byId.contentType === "blog" && byId.status === "published") {
      post = byId;
    }
  }

  if (!post) {
    notFound();
  }

  const sanitizedContent = sanitizeHtml(post.content);

  return (
    <div className="bg-cream pt-16">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              {t("backToBlog")}
            </Link>

            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />
            )}

            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <time dateTime={getISOString(post.publishedAt)}>
                {formatDate(post.publishedAt, locale)}
              </time>
              <ViewCounter id={post.id} initialViews={post.views} />
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 text-navy">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between border-y py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          <footer className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                ← {t("backToAllPosts")}
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}
