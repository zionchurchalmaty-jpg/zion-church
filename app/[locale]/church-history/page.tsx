import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { BookOpen, Calendar, Heart, Users } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "churchHistory" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ChurchHistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("churchHistory");

  const timelineEvents = [
    "1992_01_19",
    "1992_01_26",
    "1992_04_01",
    "1992_05_01",
    "1992_12_01",
    "1993_08_17",
    "1993_12_13",
    "1994_10_10",
    "1997_03_01",
    "1998_01_18",
    "1998_06_21",
    "2001_03_01",
    "2002_03_17",
    "2002_07_02",
    "2003_08_01",
    "2003_11_01",
    "2011_12_11",
    "2012_01_15",
    "2012_01_22",
    "2014_07_06",
    "2020_01_26",
  ];

  const faithFoundationItems = [
    "westminsterLarger",
    "westminsterConfession",
    "heidelberg",
    "westminsterShorter",
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center pt-16">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[rgb(var(--secondary-navy))]">
          <Image
            src="/images/church-history-hero.jpg"
            alt={t("heroImageAlt")}
            fill
            priority
            className="object-cover opacity-40"
            unoptimized
          />
        </div>

        {/* Content */}
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

      {/* Timeline Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-primary-orange/30" />

            <div className="space-y-6">
              {timelineEvents.map((eventKey, index) => (
                <div key={eventKey} className="relative flex gap-4 md:gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0 w-8 md:w-12 h-8 md:h-12 rounded-full bg-primary-orange flex items-center justify-center shadow-md">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-lg p-4 md:p-5 shadow-sm border border-gray-100 -mt-1">
                    <span className="inline-block px-2 py-0.5 rounded bg-primary-orange/10 text-primary-orange text-sm font-semibold mb-2">
                      {t(`timeline.${eventKey}.date`)}
                    </span>
                    <p className="text-gray-700 leading-relaxed">
                      {t(`timeline.${eventKey}.description`)}
                    </p>
                  </div>

                  {/* Show early church image after first few events */}
                  {index === 1 && <div className="hidden" />}
                </div>
              ))}
            </div>

            {/* Early Church Image Placeholder - positioned after initial events */}
            {/* <div className="mt-8 ml-12 md:ml-18">
              <div className="relative w-full max-w-md h-[200px] bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/images/early-church.png"
                  alt={t("earlyChurchImageAlt")}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-navy text-center mb-12">
            {t("visionMission.sectionTitle")}
          </h2>

          <div className="space-y-12">
            {/* Vision */}
            <div className="bg-cream rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-orange/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-orange" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-navy">
                  {t("visionMission.vision.title")}
                </h3>
              </div>

              <p className="text-xl font-medium text-primary-orange mb-4">
                {t("visionMission.vision.subtitle")}
              </p>

              <p className="text-gray-700 mb-4">
                {t("visionMission.vision.description")}
              </p>

              <p className="text-gray-700 mb-3">
                {t("visionMission.vision.details")}
              </p>

              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary-orange font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>Поклонение</strong> —{" "}
                    {t("visionMission.vision.worship").replace(
                      "Поклонение — ",
                      ""
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-orange font-bold">•</span>
                  <span className="text-gray-700">
                    <strong>Свидетельство</strong> —{" "}
                    {t("visionMission.vision.testimony").replace(
                      "Свидетельство — ",
                      ""
                    )}
                  </span>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-cream rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-orange/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-orange" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-navy">
                  {t("visionMission.mission.title")}
                </h3>
              </div>

              <p className="text-gray-700 mb-4">
                {t("visionMission.mission.description")}
              </p>

              <p className="text-gray-700 font-medium mb-2">
                {t("visionMission.mission.belief")}
              </p>

              <p className="text-gray-700 italic mb-4">
                {t("visionMission.mission.meaning")}
              </p>

              <p className="text-xl font-semibold text-primary-orange mb-4">
                {t("visionMission.mission.motto")}
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary-orange font-bold">•</span>
                  <span className="text-gray-700">
                    {t("visionMission.mission.learnTeach")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-orange font-bold">•</span>
                  <span className="text-gray-700">
                    {t("visionMission.mission.live")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-orange font-bold">•</span>
                  <span className="text-gray-700">
                    {t("visionMission.mission.love")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Faith Foundations Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-primary-orange mb-2">
              {t("faithFoundations.sectionTitle")}
            </p>
            <h2 className="font-serif text-3xl font-bold text-navy">
              {t("faithFoundations.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faithFoundationItems.map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Placeholder Image */}
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={`/images/faith-${item}.jpg`}
                    alt={t(`faithFoundations.items.${item}.title`)}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-navy/10">
                    <BookOpen className="w-12 h-12 text-navy/30" />
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {t(`faithFoundations.items.${item}.date`)}
                  </p>
                  <h3 className="font-serif font-semibold text-navy mb-2 line-clamp-2">
                    {t(`faithFoundations.items.${item}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {t(`faithFoundations.items.${item}.description`)}
                  </p>
                  <button className="text-sm text-primary-orange hover:underline font-medium">
                    {t("faithFoundations.readMore")} →
                  </button>
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
