import { Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function StayConnectedSection() {
  const t = useTranslations("stayConnected");

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {t("eyebrow")}
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Social Media Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Instagram Card */}
          <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="py-8">
              <div className="flex items-start gap-6">
                <div className="size-16 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram className="size-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1 text-navy">
                    {t("instagram.handle")}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {t("instagram.description")}
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <a
                      href="https://www.instagram.com/goodnewsbibleorg/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("instagram.button")}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Youth Group Instagram Card */}
          <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="py-8">
              <div className="flex items-start gap-6">
                <div className="size-16 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram className="size-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1 text-navy">
                    {t("youthInstagram.handle")}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {t("youthInstagram.description")}
                  </p>
                  <Button
                    asChild
                    className="bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  >
                    <a
                      href="https://www.instagram.com/good_news.youth/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("youthInstagram.button")}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facebook Card */}
          <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="py-8">
              <div className="flex items-start gap-6">
                <div className="size-16 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Facebook className="size-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1 text-navy">
                    {t("facebook.name")}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {t("facebook.description")}
                  </p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <a
                      href="https://www.facebook.com/goodnewsbibleorg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("facebook.button")}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* YouTube channel card */}
          <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="py-8">
              <div className="flex items-start gap-6">
                <div className="size-16 rounded-xl bg-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Youtube className="size-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1 text-navy">
                    {t("youtube.name")}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {t("youtube.description")}
                  </p>
                  <Button asChild className="bg-red-600 hover:bg-red-700">
                    <a
                      href="https://www.youtube.com/@GoodNewsBibleChurchYT"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("youtube.button")}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
