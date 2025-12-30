import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Heart, Users, Music, Home, Mic2, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

// Ministry configuration with icons and images
const MINISTRY_CONFIG = {
  children: {
    icon: Heart,
    image: "/ministry/children-ministry.jpg",
    color: "bg-pink-500",
  },
  youth: {
    icon: Users,
    image: "/ministry/youth-ministry.jpg",
    color: "bg-blue-500",
  },
  seniors: {
    icon: BookOpen,
    image: "/ministry/seniors-academy.jpg",
    color: "bg-amber-600",
  },
  worship: {
    icon: Music,
    image: "/ministry/worship-team.jpg",
    color: "bg-purple-500",
  },
  choir: {
    icon: Mic2,
    image: "/ministry/choir.jpg",
    color: "bg-indigo-500",
  },
  "home-groups": {
    icon: Home,
    image: "/ministry/home-groups.jpg",
    color: "bg-green-600",
  },
  prayer: {
    icon: Heart,
    image: "/ministry/prayer-group.jpg",
    color: "bg-rose-500",
  },
  "mens-prayer": {
    icon: Users,
    image: "/ministry/mens-prayer.jpg",
    color: "bg-slate-700",
  },
  social: {
    icon: Heart,
    image: "/ministry/social-services.jpg",
    color: "bg-teal-600",
  },
};

// Mapping from slug to translation key
const SLUG_TO_KEY: Record<string, string> = {
  children: "children",
  youth: "youth",
  seniors: "seniors",
  worship: "worship",
  choir: "choir",
  "home-groups": "homeGroups",
  prayer: "prayer",
  "mens-prayer": "mensPrayer",
  social: "social",
};

interface MinistryPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(MINISTRY_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: MinistryPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const translationKey = SLUG_TO_KEY[slug];

  if (!translationKey) {
    return { title: "Ministry Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "ministries" });

  const name = t(`groups.${translationKey}.name`);
  const description = t(`groups.${translationKey}.description`);

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

export default async function MinistryPage({ params }: MinistryPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const translationKey = SLUG_TO_KEY[slug];
  const config = MINISTRY_CONFIG[slug as keyof typeof MINISTRY_CONFIG];

  if (!translationKey || !config) {
    notFound();
  }

  const t = await getTranslations("ministries");

  const Icon = config.icon;
  const name = t(`groups.${translationKey}.name`);
  const description = t(`groups.${translationKey}.description`);
  const fullDescription = t(`groups.${translationKey}.fullDescription`);
  const ctaType = t(`groups.${translationKey}.ctaType`);

  // Check for special content sections
  const hasGoals = translationKey === "children";
  const hasPastProjects = translationKey === "social";
  const hasClosing =
    translationKey === "children" || translationKey === "social";

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
          href="/#groups"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("backToMinistries")}
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

          {/* Goals Section (Children Ministry) */}
          {hasGoals && (
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="font-serif text-xl font-semibold text-navy mb-4">
                {t(`groups.${translationKey}.goals.title`)}
              </h2>
              <ul className="space-y-3">
                {(
                  t.raw(`groups.${translationKey}.goals.items`) as string[]
                ).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary-orange" />
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Past Projects Section (Social Ministry) */}
          {hasPastProjects && (
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="font-serif text-xl font-semibold text-navy mb-4">
                {t(`groups.${translationKey}.pastProjects.title`)}
              </h2>
              <ul className="space-y-3">
                {(
                  t.raw(`groups.${translationKey}.pastProjects.items`) as string[]
                ).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-teal-600" />
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Closing Statement */}
          {hasClosing && (
            <p className="text-gray-700 leading-relaxed mb-8 italic">
              {t(`groups.${translationKey}.closing`)}
            </p>
          )}

          {/* CTA Section */}
          <div className="bg-navy rounded-xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-white mb-4">
              {ctaType === "join" && t("joinUs")}
              {ctaType === "apply" && t("applyButton")}
              {ctaType === "parentApplication" && t("parentApplication")}
              {ctaType === "prayerRequest" && t("prayerTopics")}
              {ctaType === "signUp" && t("joinUs")}
            </h2>
            <Link href="/#contact">
              <Button
                size="lg"
                className="bg-primary-orange hover:bg-primary-orange/90 text-white"
              >
                {ctaType === "join" && t("joinUs")}
                {ctaType === "apply" && t("applyButton")}
                {ctaType === "parentApplication" && t("parentApplication")}
                {ctaType === "prayerRequest" && t("prayerTopics")}
                {ctaType === "signUp" && t("joinUs")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
