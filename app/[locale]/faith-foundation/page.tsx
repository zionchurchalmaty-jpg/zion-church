import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { BookOpen, ChevronRight, ScrollText } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faithFoundation" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function FaithFoundationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faithFoundation");

  const documents = [
    {
      id: "westminster-larger",
      icon: ScrollText,
      href: "/faith-foundation/westminster-larger",
    },
    {
      id: "westminster-confession",
      icon: BookOpen,
      href: "/faith-foundation/westminster-confession",
    },
    {
      id: "heidelberg",
      icon: ScrollText,
      href: "/faith-foundation/heidelberg",
    },
    {
      id: "westminster-shorter",
      icon: ScrollText,
      href: "/faith-foundation/westminster-shorter",
    },
  ];

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
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
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

      {/* Introduction */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <p className="text-gray-700 text-lg leading-relaxed">
              {t("introduction")}
            </p>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link
                  key={doc.id}
                  href={doc.href}
                  className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-orange/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-orange/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-semibold text-navy mb-2 group-hover:text-primary-orange transition-colors">
                        {t(`documents.${doc.id}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {t(`documents.${doc.id}.date`)}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {t(`documents.${doc.id}.description`)}
                      </p>
                      <span className="inline-flex items-center text-sm text-primary-orange font-medium group-hover:underline">
                        {t("readDocument")}
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
