import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { westminsterLargerQuestions } from "@/content/faith-foundation/westminster-larger";
import { Link } from "@/i18n/navigation";
import { BookOpen, ScrollText } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "westminsterLarger" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WestminsterLargerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("westminsterLarger");
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
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {t("introduction")}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-cream rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <ScrollText className="w-5 h-5 text-primary-orange" />
                  <h3 className="font-semibold text-navy">{t("part1Title")}</h3>
                </div>
                <p className="text-sm text-gray-600">{t("part1Description")}</p>
              </div>
              <div className="bg-cream rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-primary-orange" />
                  <h3 className="font-semibold text-navy">{t("part2Title")}</h3>
                </div>
                <p className="text-sm text-gray-600">{t("part2Description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Questions */}
      <section className="py-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {westminsterLargerQuestions.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-orange text-white text-sm font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-2">
                      <span className="text-primary-orange">В.</span> {item.q}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-primary-orange font-semibold">О.</span> {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
