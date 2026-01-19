import { Footer } from "@/components/footer";
import { MinistryCard } from "@/components/ministry-card";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { BookOpen, Flame, Heart, Target, Users } from "lucide-react";
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

      <div className="max-w-4xl mx-auto px-4 pb-12 sm:pb-26 sm:px-6 lg:px-8 space-y-12 py-12">
        
        {/* Vision Section */}
        <MinistryCard 
          title={t("vision.title")} 
          icon={Heart} 
          variant="feature"
        >
          <p className="text-lg text-gray-800 font-medium mb-2">
            {t("vision.mainText")}
          </p>
          <p className="text-primary-orange font-bold mb-6">
            {t("vision.verse")}
          </p>

          <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-orange">
            <p className="text-gray-700 font-medium mb-3">
              {t("vision.subIntro")}
            </p>
            <p className="text-gray-600 mb-4">{t("vision.responsibilityTitle")}</p>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary-orange font-bold text-lg">•</span>
                <span className="text-gray-700">
                  <strong className="text-navy">{t("vision.point1_title")}</strong> — {t("vision.point1_text")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-orange font-bold text-lg">•</span>
                <span className="text-gray-700">
                  <strong className="text-navy">{t("vision.point2_title")}</strong> — {t("vision.point2_text")}
                </span>
              </li>
            </ul>
          </div>
        </MinistryCard>

        {/* Mission Section */}
        <MinistryCard 
          title={t("mission.title")} 
          icon={Target} 
          variant="feature"
        >
          <p className="text-gray-700 text-lg mb-6 font-medium">
            {t("mission.intro")}
          </p>

          <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2 mb-6 bg-blue-50/50">
            <p className="whitespace-pre-line mb-2 leading-relaxed">
              {t("mission.bibleText")}
            </p>
            <cite className="block text-sm font-bold not-italic text-blue-600 mt-2">
              {t("mission.bibleRef")}
            </cite>
          </blockquote>

          <p className="text-navy font-semibold text-lg whitespace-pre-line">
            {t("mission.foundation")}
          </p>
        </MinistryCard>

        {/* Slogans Section */}
        <section>
          <h3 className="text-center font-serif text-2xl font-bold text-navy mb-8 uppercase tracking-wide">
            {t("slogans.mainTitle")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Learn Section */}
            <MinistryCard 
              title={t("slogans.learn_title")} 
              icon={BookOpen} 
              variant="compact"
            >
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {t("slogans.learn_text")}
              </p>
              <p className="text-xs text-gray-400 font-mono">
                {t("slogans.learn_ref")}
              </p>
            </MinistryCard>

            {/* Live Section */}
            <MinistryCard 
              title={t("slogans.live_title")} 
              icon={Flame} 
              variant="compact"
            >
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {t("slogans.live_text")}
              </p>
              <p className="text-xs text-gray-400 font-mono">
                {t("slogans.live_ref")}
              </p>
            </MinistryCard>

            {/* Love Section */}
            <MinistryCard 
              title={t("slogans.love_title")} 
              icon={Users} 
              variant="compact"
            >
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {t("slogans.love_text")}
              </p>
              <p className="text-xs text-gray-400 font-mono">
                {t("slogans.love_ref")}
              </p>
            </MinistryCard>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
