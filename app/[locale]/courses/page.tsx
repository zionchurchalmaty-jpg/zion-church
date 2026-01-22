import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { CourseRequestForm } from "@/components/courses/course-request-form";
import { MinistryCard } from "@/components/ministry-card";
import { BookOpen, Calendar, Clock, GraduationCap, Heart } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "coursesPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("coursesPage");

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[350px] flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-[rgb(var(--secondary-navy))]">
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-xs md:text-sm uppercase tracking-widest mb-3 text-white/80 font-medium">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-primary-orange transition-colors"
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
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Grid Layout*/}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Side */}
          <div className="lg:col-span-7 space-y-8">
            <MinistryCard
              title={t("mainContent.title")}
              icon={Heart}
              variant="feature"
            >
              <div className="prose prose-stone max-w-none text-gray-700">
                <p className="mb-4">{t("mainContent.intro1")}</p>
                <p className="mb-6">{t("mainContent.intro2")}</p>

                <div className="bg-blue-50/50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                  <p className="text-sm text-blue-900 font-medium">
                    {t("mainContent.goalBox")}
                  </p>
                </div>

                <h3 className="text-xl font-bold text-navy mt-8 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-orange" />
                  {t("coursesList.title")}
                </h3>

                <div className="space-y-6">
                  <div className="bg-stone-50 p-5 rounded-xl border border-stone-100">
                    <h4 className="font-bold text-lg text-navy mb-3">
                      {t("coursesList.korean.title")}
                    </h4>
                    <ul className="space-y-2 text-sm text-stone-600">
                      <li className="flex gap-2">
                        <Clock className="w-4 h-4 text-primary-orange shrink-0 mt-0.5" />
                        <span>
                          <strong>{t("coursesList.labels.classes")}:</strong>{" "}
                          {t("coursesList.korean.schedule")}
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <Calendar className="w-4 h-4 text-primary-orange shrink-0 mt-0.5" />
                        <span>
                          <strong>{t("coursesList.labels.program")}:</strong>{" "}
                          {t("coursesList.korean.program")}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-xl border border-stone-100">
                    <h4 className="font-bold text-lg text-navy mb-3">
                      {t("coursesList.kazakh.title")}
                    </h4>
                    <ul className="space-y-2 text-sm text-stone-600">
                      <li className="flex gap-2">
                        <Clock className="w-4 h-4 text-primary-orange shrink-0 mt-0.5" />
                        <span>
                          <strong>{t("coursesList.labels.classes")}:</strong>{" "}
                          {t("coursesList.kazakh.schedule")}
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <Calendar className="w-4 h-4 text-primary-orange shrink-0 mt-0.5" />
                        <span>
                          <strong>{t("coursesList.labels.program")}:</strong>{" "}
                          {t("coursesList.kazakh.program")}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-xl border border-stone-100">
                    <h4 className="font-bold text-lg text-navy mb-3">
                      {t("coursesList.english.title")}
                    </h4>
                    <ul className="space-y-2 text-sm text-stone-600">
                      <li className="flex gap-2">
                        <Clock className="w-4 h-4 text-primary-orange shrink-0 mt-0.5" />
                        <span>
                          <strong>{t("coursesList.labels.classes")}:</strong>{" "}
                          {t("coursesList.english.schedule")}
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <Calendar className="w-4 h-4 text-primary-orange shrink-0 mt-0.5" />
                        <span>
                          <strong>{t("coursesList.labels.duration")}:</strong>{" "}
                          {t("coursesList.english.duration")}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-xl flex gap-3 items-start">
                  <GraduationCap className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-green-800 block mb-1">
                      {t("importantNote.label")}
                    </span>
                    <p className="text-sm text-green-700">
                      {t("importantNote.text")}
                    </p>
                  </div>
                </div>
              </div>
            </MinistryCard>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="sticky top-24">
              <CourseRequestForm />
              <p className="text-xs text-stone-400 text-center mt-6 px-4 leading-relaxed">
                {t("sidebarNote")}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
