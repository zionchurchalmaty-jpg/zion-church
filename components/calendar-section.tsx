import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Gift, Flame, BookOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { LucideIcon } from "lucide-react";

// Hard-coded event configuration
const EVENTS_CONFIG: {
  slug: string;
  translationKey: string;
  icon: LucideIcon;
  image: string;
  color: string;
}[] = [
  {
    slug: "good-samaritan",
    translationKey: "good-samaritan",
    icon: Gift,
    image: "/events/good-samaritan.jpg",
    color: "bg-rose-500",
  },
  {
    slug: "advent",
    translationKey: "advent",
    icon: Flame,
    image: "/events/advent.jpg",
    color: "bg-purple-600",
  },
  {
    slug: "alpha-course",
    translationKey: "alpha-course",
    icon: BookOpen,
    image: "/events/alpha-course.jpg",
    color: "bg-amber-500",
  },
];

export async function CalendarSection() {
  const t = await getTranslations("calendar");
  const tEvents = await getTranslations("events");

  return (
    <section id="calendar" className="py-20 bg-white">
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

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {EVENTS_CONFIG.map((event) => {
            const Icon = event.icon;
            const name = tEvents(`${event.translationKey}.name`);
            const description = tEvents(`${event.translationKey}.description`);

            return (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="block"
              >
                <Card className="bg-cream hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col h-full pt-0! gap-0!">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />
                    <div
                      className={`absolute bottom-4 left-4 ${event.color} rounded-lg px-3 py-2 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardContent className="py-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-navy group-hover:text-primary transition-colors">
                      {name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {description}
                    </p>
                    <span className="inline-flex items-center mt-auto pt-4 text-primary text-sm font-medium">
                      {t("learnMore")}
                      <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
