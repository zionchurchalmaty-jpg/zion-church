import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { westminsterConfessionChapters } from "@/content/faith-foundation/westminster-confession";
import { Link } from "@/i18n/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "westminsterConfession" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WestminsterConfessionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("westminsterConfession");
  const tf = await getTranslations("faithFoundation");

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-[rgb(var(--secondary-navy))]">
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-wider mb-2 text-white/80">
            {t("date")}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {t("title")}
          </h1>
          <p className="text-lg text-white/70">{t("subtitle")}</p>
        </div>
      </section>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/faith-foundation"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
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
          {tf("backToFaithFoundation")}
        </Link>
      </div>

      {/* Introduction */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <p className="text-gray-700 text-lg leading-relaxed">
              {t("introduction")}
            </p>
          </div>
        </div>
      </section>

      {/* All Chapters */}
      <section className="py-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {westminsterConfessionChapters.map((chapter, index) => (
              <details
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 group"
              >
                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white text-sm font-semibold">
                      {chapter.num}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-navy">
                      Глава {chapter.num}: {chapter.title}
                    </h3>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:hidden" />
                  <ChevronUp className="w-5 h-5 text-primary-orange hidden group-open:block" />
                </summary>
                <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                  <div className="space-y-4 pt-4">
                    {chapter.content.map((paragraph, pIndex) => (
                      <div key={pIndex} className="flex gap-3">
                        <span className="flex-shrink-0 text-sm font-semibold text-primary-orange">
                          {chapter.num}.{pIndex + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
