import { getPublishedContent } from "@/lib/firestore/content";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import type { Content, ContentLanguage } from "@/lib/firestore/types";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "songs" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// Revalidate every 5 minutes
export const revalidate = 300;

function getUniqueTags(songs: Content[]): string[] {
  const tagsSet = new Set<string>();
  songs.forEach((song) => {
    song.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

export default async function SongsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("songs");

  // Get songs filtered by locale
  const allSongs = await getPublishedContent("song");
  const songs = allSongs.filter(
    (song) => song.language === (locale as ContentLanguage)
  );
  const tags = getUniqueTags(songs);

  return (
    <div className="min-h-screen flex flex-col bg-cream pt-16">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
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
              {t("backToHome")}
            </Link>

            <header className="mb-12">
              <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 text-navy">
                {t("title")}
              </h1>
              <p className="text-xl text-muted-foreground">{t("description")}</p>
            </header>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {songs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("noSongsYet")}</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {songs.map((song) => (
                  <article
                    key={song.id}
                    className="group border rounded-lg p-6 hover:border-primary/50 transition-colors bg-white"
                  >
                    <Link href={`/songs/${song.slug}`}>
                      <div className="flex flex-col space-y-3">
                        {song.coverImage && (
                          <img
                            src={song.coverImage}
                            alt={song.title}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        )}
                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors text-navy">
                          {song.title}
                        </h2>
                        {song.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {song.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-muted-foreground">
                            {song.author}
                          </span>
                          {song.tags && song.tags.length > 0 && (
                            <div className="flex gap-1">
                              {song.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
