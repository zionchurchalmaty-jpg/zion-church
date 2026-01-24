import { Briefcase, Clock, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export function LocationSection() {
  const t = useTranslations("location");

  return (
    <section id="location" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-sm font-semibold text-navy uppercase tracking-wider">
                  {t("eyebrow")}
                </span>
                <div className="h-px w-12 bg-primary" />
              </div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
                {t("title")}
              </h2>
              <p className="text-lg text-gray-700">{t("subtitle")}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-navy mb-1">
                    {t("address")}
                  </h3>
                  <p className="text-gray-700">{t("addressLine1")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-navy mb-1">
                    {t("serviceTimes")}
                  </h3>
                  <p className="text-gray-700">{t("sundayWorship")}</p>
                  <p className="text-gray-700">{t("tuesdayPrayer")}</p>
                  <p className="text-gray-700">{t("youthService")}</p>
                  <p className="text-gray-700">{t("homeGroups")}</p>
                  <p className="text-gray-700">{t("thursdayPrayer")}</p>
                  <p className="text-gray-700">{t("elderlyService")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-navy mb-1">
                    {t("officeHours")}
                  </h3>
                  <p className="text-gray-700">{t("officeSchedule")}</p>
                  <p className="text-gray-700">{t("officeClosed")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-navy mb-1">
                    {t("contact")}
                  </h3>
                  <p className="text-gray-700">{t("phone")}</p>
                  <p className="text-gray-700">{t("mobile")}</p>
                  <p className="text-gray-700">{t("whatsapp")}</p>
                  <p className="text-gray-700">{t("email")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Map */}
          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-stone-200 shadow-sm relative z-0">
            <iframe
              title="2GIS Map"
              src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A43.222616%2C%22lon%22%3A76.939503%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22almaty%22%7D%2C%22org%22%3A%229429940000800380%22%7D"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
            <a
              href="https://2gis.kz/almaty/firm/9429940000800380?m=76.939503%2C43.222616%2F16"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 md:hidden"
              aria-label="Открыть в приложении 2GIS"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
