"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  ChevronRight,
  Heart,
  Home,
  Mic2,
  Music,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

interface MinistryConfig {
  id: string;
  translationKey: string;
  slug: string;
  image: string;
  icon: LucideIcon;
  color: string;
}

const MINISTRIES_CONFIG: MinistryConfig[] = [
  {
    id: "children",
    translationKey: "children",
    slug: "children",
    image: "/ministry/children-ministry.jpg",
    icon: Heart,
    color: "bg-pink-500",
  },
  {
    id: "youth",
    translationKey: "youth",
    slug: "youth",
    image: "/ministry/youth-ministry.jpg",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    id: "seniors",
    translationKey: "seniors",
    slug: "seniors",
    image: "/ministry/seniors-academy.jpg",
    icon: BookOpen,
    color: "bg-amber-600",
  },
  {
    id: "worship",
    translationKey: "worship",
    slug: "worship",
    image: "/ministry/worship-team.jpg",
    icon: Music,
    color: "bg-purple-500",
  },
  {
    id: "choir",
    translationKey: "choir",
    slug: "choir",
    image: "/ministry/choir.jpg",
    icon: Mic2,
    color: "bg-indigo-500",
  },
  {
    id: "home-groups",
    translationKey: "homeGroups",
    slug: "home-groups",
    image: "/ministry/home-groups.jpg",
    icon: Home,
    color: "bg-green-600",
  },
  {
    id: "prayer",
    translationKey: "prayer",
    slug: "prayer",
    image: "/ministry/prayer-group.jpg",
    icon: Heart,
    color: "bg-rose-500",
  },
  {
    id: "mens-prayer",
    translationKey: "mensPrayer",
    slug: "mens-prayer",
    image: "/ministry/mens-prayer.jpg",
    icon: Users,
    color: "bg-slate-700",
  },
  {
    id: "social",
    translationKey: "social",
    slug: "social",
    image: "/ministry/social-services.jpg",
    icon: Heart,
    color: "bg-teal-600",
  },
];

export function MinistriesSection() {
  const t = useTranslations("ministries");

  return (
    <section id="groups" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Ministry Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES_CONFIG.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <Card
                key={ministry.id}
                className="bg-cream hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col h-full !pt-0 !gap-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={ministry.image}
                    alt={t(`groups.${ministry.translationKey}.name`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  <div
                    className={`absolute bottom-4 left-4 w-12 h-12 ${ministry.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardContent className="py-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-xl mb-2 text-navy">
                    {t(`groups.${ministry.translationKey}.name`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-1 line-clamp-3">
                    {t(`groups.${ministry.translationKey}.description`)}
                  </p>
                  <Link
                    href={`/ministry/${ministry.slug}`}
                    className="inline-flex items-center mt-4 text-primary hover:underline text-sm font-medium group/link"
                  >
                    {t("learnMore")}
                    <ChevronRight className="size-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {t("subtitle")}
          </p>
          <Link href="/#contact">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 bg-transparent hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-colors"
            >
              {t("joinUs")}
              <ChevronRight className="size-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
