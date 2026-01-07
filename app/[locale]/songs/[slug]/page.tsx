import { Link } from "@/i18n/navigation";
import { getPublishedContentBySlug } from "@/lib/firestore/content";
import sanitize from "sanitize-html";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

interface SongPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

// Revalidate every 5 minutes
export const revalidate = 300;

export async function generateMetadata({
  params,
}: SongPageProps): Promise<Metadata> {
  const { slug } = await params;
  const song = await getPublishedContentBySlug("song", slug);

  if (!song) {
    return {
      title: "Song Not Found - Церкось Сион",
    };
  }

  const title = song.seo.metaTitle || song.title;
  const description = song.seo.metaDescription || song.excerpt || "";
  const ogImage = song.seo.ogImage || song.coverImage;

  return {
    title: `${title} - Церкось Сион Songs`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: song.publishedAt?.toDate().toISOString(),
      authors: [song.author],
      tags: song.tags,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    ...(song.seo.canonicalUrl && {
      alternates: { canonical: song.seo.canonicalUrl },
    }),
    ...(song.seo.noIndex && { robots: { index: false } }),
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

export default async function SongPage({ params }: SongPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("songs");

  const song = await getPublishedContentBySlug("song", slug);

  if (!song) {
    notFound();
  }

  const sanitizedContent = sanitizeHtml(song.content);

  return (
    <div className="min-h-screen flex flex-col bg-cream pt-16">
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <header className="mb-10">
              <Link
                href="/songs"
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
                {t("backToSongs")}
              </Link>

              {song.coverImage && (
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
                />
              )}

              <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 text-navy">
                {song.title}
              </h1>

              {song.excerpt && (
                <p className="text-xl text-muted-foreground mb-6">
                  {song.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between border-y py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {song.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{song.author}</div>
                  </div>
                </div>

                {song.tags && song.tags.length > 0 && (
                  <div className="flex gap-2">
                    {song.tags.map((tag) => (
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
              className="prose prose-neutral max-w-none whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            <footer className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <Link
                  href="/songs"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← {t("backToAllSongs")}
                </Link>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </div>
  );
}
