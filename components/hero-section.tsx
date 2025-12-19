"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, MapPin, Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--secondary-navy))] via-[rgb(var(--secondary-navy-light))] to-[rgb(var(--secondary-navy))]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source
            src="/hero-video-2.mp4?height=1080&width=1920&query=happy+people+coming+to+church"
            type="video/mp4"
          />
        </video>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Motto */}
        <p className="font-serif text-4xl sm:text-5xl text-white/90 mb-4 animate-fade-in-up animation-delay-100 text-balance">
          {t("welcomeTo")} <span className="font-bold">{t("churchName")}</span>
        </p>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed italic">
          {t("subtitle")}
        </p>

        {/* Quick Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-white animate-fade-in-up animation-delay-300">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-primary" />
            <span className="text-sm sm:text-base">{t("address")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-primary" />
            <span className="text-sm sm:text-base">{t("serviceTime")}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
          <Button
            size="lg"
            className="px-8"
            onClick={() => {
              document
                .getElementById("what-to-expect")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("whatToExpect")}
            <ChevronRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
            asChild
          >
            <a
              href="https://www.youtube.com/@GoodNewsBibleChurchYT/streams"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play className="size-4" />
              {t("watchOnline")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
