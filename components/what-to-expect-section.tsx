import { Card, CardContent } from "@/components/ui/card";
import { Baby, BookOpen, Check, Coffee, Music } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhatToExpectSection() {
  const t = useTranslations("whatToExpect");

  const features = [
    {
      icon: Music,
      titleKey: "features.worship.title",
      descriptionKey: "features.worship.description",
      image: "/church-worship-choir-singing.png",
    },
    {
      icon: BookOpen,
      titleKey: "features.sermon.title",
      descriptionKey: "features.sermon.description",
      image: "/pastor-preaching-sermon.png",
    },
    {
      icon: Baby,
      titleKey: "features.kids.title",
      descriptionKey: "features.kids.description",
      image: "/children-sunday-school.png",
    },
    {
      icon: Coffee,
      titleKey: "features.coffee.title",
      descriptionKey: "features.coffee.description",
      image: "/church-fellowship-coffee-people.png",
    },
  ];

  return (
    <section id="what-to-expect" className="py-20 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-navy uppercase tracking-wider">
              {t("eyebrow")}
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-lg pt-0 transition-shadow duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={t(feature.titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <feature.icon className="absolute bottom-4 left-4 size-10 text-white drop-shadow-lg" />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Checklist */}
        <Card className="bg-white max-w-3xl mx-auto">
          <CardContent className="py-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t("checklist.duration")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t("checklist.dress")}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t("checklist.translation")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t("checklist.parking")}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
