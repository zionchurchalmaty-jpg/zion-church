"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, MapPin, Play, Rotate3d } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--secondary-navy))] via-[rgb(var(--secondary-navy-light))] to-[rgb(var(--secondary-navy))]">
        <Image
          src="/zion-church.jpg"
          alt="Церковь Сион"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Motto */}
        <p className="font-serif text-5xl sm:text-5xl text-white/90 mb-4 animate-fade-in-up animation-delay-100 text-balance">
          {t("welcomeTo")} <span className="font-bold">{t("churchName")}</span>
        </p>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed italic">
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
              href="https://www.instagram.com/zionchurch.kz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play className="size-4" />
              {t("watchOnline")}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
            asChild
          >
            <a
              href="https://www.google.com/maps/@43.2225172,76.9395337,3a,75y,303.73h,100.78t/data=!3m8!1e1!3m6!1sAF1QipPlodFgyP0vQxXgInqIVMZWbuwQ4dhCF94vDLDc!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipPlodFgyP0vQxXgInqIVMZWbuwQ4dhCF94vDLDc%3Dw900-h600-k-no-pi-10.780000000000001-ya6.140003662109393-ro0-fo100!7i10000!8i5000?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Rotate3d className="size-4" />
              {t("tour3d")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
