import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center pt-16">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[rgb(var(--secondary-navy))]">
          <Image
            src="/images/church-history-hero.jpg"
            alt={t("images.heroImageAlt")}
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative w-full aspect-[16/9] mb-10 rounded-sm overflow-hidden shadow-sm">
          <Image
            src="/images/church-history-hero.jpg"
            alt={t("images.mainPhotoAlt")}
            fill
            className="object-cover"
          />
        </div>

        {/* Chronicle text */}
        <div className="max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-navy uppercase mb-6 border-b-2 border-primary-orange inline-block pb-1">
            {t("chronicle.sectionTitle")}
          </h2>

          <div className="space-y-5">
            {timelineEvents.map((eventKey, index) => (
              <div key={eventKey}>
                {index === 2 && (
                  <div className="w-full my-10">
                    <Image
                      src="/images/early-church.png"
                      alt={t("images.meetingAlt")}
                      width={632}
                      height={237}
                      className="w-full h-auto rounded-lg shadow-md block"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    />
                  </div>
                )}
                {/* Text Item */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span className="font-bold text-navy shrink-0 min-w-[130px]">
                    {t(`timeline.${eventKey}.date`)}
                  </span>
                  <span className="hidden sm:inline text-primary-orange font-bold">
                    –
                  </span>
                  <span className="text-gray-800 leading-relaxed">
                    {t(`timeline.${eventKey}.description`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Video archive section */}
        <div className="mt-16 space-y-10">
          <h2 className="text-2xl font-bold text-navy border-b pb-4 mb-8">
            {t("videos.sectionTitle")}
          </h2>

          {/* Video 1 */}
          <div className="space-y-3">
            <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/aUkVYcnfs0E?si=U4sNg4_HAkEsJal1"
                title={t("videos.video1Title")}
                className="absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h4 className="font-bold text-lg text-navy">
              {t("videos.video1Title")}
            </h4>
          </div>

          {/* Video 2 */}
          <div className="space-y-3">
            <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/novswNp1HtM?si=nM00AU7xFi_uaf_4"
                title={t("videos.video2Title")}
                className="absolute inset-0"
                allowFullScreen
              ></iframe>
            </div>
            <h4 className="font-bold text-lg text-navy">
              {t("videos.video2Title")}
            </h4>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}