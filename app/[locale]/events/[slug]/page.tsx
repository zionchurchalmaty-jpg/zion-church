import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Gift, Flame, BookOpen, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

// Event configuration with icons and images
const EVENT_CONFIG = {
  "good-samaritan": {
    icon: Gift,
    image: "/events/good-samaritan.jpg",
    color: "bg-rose-500",
  },
  advent: {
    icon: Flame,
    image: "/events/advent.jpg",
    color: "bg-purple-600",
  },
  "alpha-course": {
    icon: BookOpen,
    image: "/events/alpha-course.jpg",
    color: "bg-amber-500",
  },
};

// Mapping from slug to translation key
const SLUG_TO_KEY: Record<string, string> = {
  "good-samaritan": "good-samaritan",
  advent: "advent",
  "alpha-course": "alpha-course",
};

interface EventPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(EVENT_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const translationKey = SLUG_TO_KEY[slug];

  if (!translationKey) {
    return { title: "Event Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "events" });

  const name = t(`${translationKey}.name`);
  const description = t(`${translationKey}.description`);

  return {
    title: `${name} - Церковь Сион`,
    description,
    openGraph: {
      title: name,
      description,
      type: "website",
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const translationKey = SLUG_TO_KEY[slug];
  const config = EVENT_CONFIG[slug as keyof typeof EVENT_CONFIG];

  if (!translationKey || !config) {
    notFound();
  }

  const t = await getTranslations("events");
  const tCalendar = await getTranslations("calendar");

  const Icon = config.icon;
  const name = t(`${translationKey}.name`);
  const description = t(`${translationKey}.description`);
  const fullDescription = t(`${translationKey}.fullDescription`);

  // Check for special content sections
  const hasCandles = translationKey === "advent";
  const hasVerse = translationKey === "alpha-course";

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-[rgb(var(--secondary-navy))]">
          <Image
            src={config.image}
            alt={name}
            fill
            priority
            className="object-cover opacity-40"
            unoptimized
          />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <div
            className={`w-16 h-16 ${config.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
            {name}
          </h1>
        </div>
      </section>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/#calendar"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {tCalendar("backToHome")}
        </Link>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Short Description */}
          <div className="bg-primary-orange/10 border-l-4 border-primary-orange rounded-r-lg p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Full Description */}
          <div className="prose prose-lg max-w-none mb-8">
            {fullDescription.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Candles Section (Advent) */}
          {hasCandles && (
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="font-serif text-xl font-semibold text-navy mb-6">
                {t(`${translationKey}.candles.title`)}
              </h2>
              <div className="space-y-6">
                {["first", "second", "third", "fourth"].map((candle, index) => (
                  <div key={candle} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Flame
                        className={`w-5 h-5 ${
                          index === 2 ? "text-pink-500" : "text-purple-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">
                        {t(`${translationKey}.candles.${candle}.title`)}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t(`${translationKey}.candles.${candle}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bible Verse (Alpha Course) */}
          {hasVerse && (
            <div className="bg-navy rounded-xl p-8 text-center">
              <Calendar className="w-10 h-10 text-primary-orange mx-auto mb-4" />
              <blockquote className="font-serif text-lg md:text-xl text-white italic leading-relaxed">
                {t(`${translationKey}.verse`)}
              </blockquote>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
