import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { BookOpen, Heart, Target, Users } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "missionPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function MissionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("missionPage");

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
            {t("pageTitle")}
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
          href="/"
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
          {t("backToHome")}
        </Link>
      </div>

      {/* Vision Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-orange/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-orange" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                {t("vision.title")}
              </h2>
            </div>

            <p className="text-xl font-semibold text-primary-orange mb-4">
              {t("vision.subtitle")}
            </p>

            <p className="text-gray-700 text-lg mb-4">
              {t("vision.description")}{" "}
              <span className="text-primary-orange font-medium">
                {t("vision.verse")}
              </span>
            </p>

            <p className="text-gray-600 italic mb-4">{t("vision.peterIntro")}</p>

            <p className="text-gray-700 mb-4">{t("vision.responsibility")}</p>

            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-primary-orange font-bold text-xl">•</span>
                <span className="text-gray-700">
                  <strong>Богослужение</strong> — {t("vision.worship").replace("Богослужение — ", "")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-orange font-bold text-xl">•</span>
                <span className="text-gray-700">
                  <strong>Свидетельство</strong> — {t("vision.testimony").replace("Свидетельство — ", "")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-orange/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-orange" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                {t("mission.title")}
              </h2>
            </div>

            <p className="text-gray-700 text-lg mb-2">
              {t("mission.description")}
            </p>

            <p className="text-primary-orange font-medium mb-6">
              {t("mission.verse")}
            </p>

            <p className="text-gray-700 mb-4">{t("mission.belief")}</p>

            <p className="text-gray-600 italic">
              {t("mission.references")}
            </p>
          </div>
        </div>
      </section>

      {/* Love Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-orange/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-orange" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                {t("love.title")}
              </h2>
            </div>

            <p className="text-gray-700 text-lg mb-4">
              {t("love.description")}
            </p>

            <p className="text-primary-orange font-medium">
              {t("love.verses")}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
