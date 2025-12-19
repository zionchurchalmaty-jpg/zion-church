import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/church-family-community.png"
              alt={t("imageAlt")}
              className="w-full h-full object-cover"
            />
            <p className="mt-4 text-sm text-gray-700 text-center">
              {t("imageCaption")}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {t("eyebrow")}
              </span>
            </div>

            <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy text-balance">
              {t("title")}
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </div>

            <div className="bg-cream border-l-4 border-primary p-6 rounded-lg">
              <p className="font-serif text-xl text-navy font-medium italic">
                "{t("motto")}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
