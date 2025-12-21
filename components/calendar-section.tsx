import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUpcomingEvents, type CalendarEvent } from "@/lib/planning-center";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

function formatEventDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatEventTime(date: Date, locale: string): string {
  return date.toLocaleTimeString(locale === "ru" ? "ru-RU" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: locale !== "ru",
    timeZone: "America/New_York",
  });
}

function getMonthAbbr(date: Date, locale: string): string {
  return date
    .toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", { month: "short" })
    .toUpperCase();
}

function getDay(date: Date): string {
  return date.getDate().toString();
}

/**
 * Normalizes bilingual event names based on locale.
 *
 * Handles formats like:
 * - "Good News Youth - Молодежь: Friday Nights - Встречи по Пятницам" (group: event, both bilingual)
 * - "Christmas concert - Праздничный концерт" (simple bilingual)
 * - "Christmas Eve - Сочельник" (simple bilingual)
 *
 * @param name - The raw event name from Planning Center
 * @param locale - The current locale ('en' or 'ru')
 * @returns The localized event name
 */
function normalizeEventName(name: string, locale: string): string {
  const isRussian = locale === "ru";

  /**
   * Extracts the localized part from a bilingual string.
   * Format: "English text - Russian текст"
   * Returns the appropriate part based on locale, or the original if no separator found.
   */
  function extractLocalizedPart(text: string): string {
    const trimmed = text.trim();
    // Look for " - " separator (with spaces to avoid splitting on hyphens within words)
    const separatorIndex = trimmed.indexOf(" - ");

    if (separatorIndex === -1) {
      // No bilingual separator found, return as-is
      return trimmed;
    }

    const englishPart = trimmed.substring(0, separatorIndex).trim();
    const russianPart = trimmed.substring(separatorIndex + 3).trim();

    // Fallback: if the expected part is empty, use the other one
    if (isRussian) {
      return russianPart || englishPart || trimmed;
    }
    return englishPart || russianPart || trimmed;
  }

  // Check if there's a group:event format (colon separator)
  const colonIndex = name.indexOf(":");

  if (colonIndex !== -1) {
    // Format: "Group Name - Группа: Event Name - Название"
    const groupPart = name.substring(0, colonIndex);
    const eventPart = name.substring(colonIndex + 1);

    const localizedGroup = extractLocalizedPart(groupPart);
    const localizedEvent = extractLocalizedPart(eventPart);

    // Return combined format: "Group: Event"
    return `${localizedGroup}: ${localizedEvent}`;
  }

  // Simple bilingual format: "English - Russian"
  return extractLocalizedPart(name);
}

export async function CalendarSection() {
  const locale = await getLocale();
  const t = await getTranslations("calendar");

  const fallbackEvents: CalendarEvent[] = [
    {
      id: "fallback-1",
      name: t("fallbackEvents.sundayWorship.name"),
      description: t("fallbackEvents.sundayWorship.description"),
      image: null,
      startsAt: new Date(),
      endsAt: new Date(),
    },
    {
      id: "fallback-2",
      name: t("fallbackEvents.thursdayPrayer.name"),
      description: t("fallbackEvents.thursdayPrayer.description"),
      image: null,
      startsAt: new Date(),
      endsAt: new Date(),
    },
    {
      id: "fallback-3",
      name: t("fallbackEvents.youthNight.name"),
      description: t("fallbackEvents.youthNight.description"),
      image: null,
      startsAt: new Date(),
      endsAt: new Date(),
    },
  ];

  const events = await getUpcomingEvents();
  const displayEvents = events.length > 0 ? events : fallbackEvents;

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
          {displayEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-cream hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col h-full pt-0! gap-0!"
            >
              {event.image ? (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={event.image}
                    alt={normalizeEventName(event.name, locale)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-xs font-bold text-primary uppercase">
                      {getMonthAbbr(event.startsAt, locale)}
                    </div>
                    <div className="text-2xl font-bold text-navy leading-none">
                      {getDay(event.startsAt)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative bg-linear-to-br from-navy to-navy/80 aspect-video flex items-center justify-center">
                  <Calendar className="size-16 text-white/30" />
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-xs font-bold text-primary uppercase">
                      {getMonthAbbr(event.startsAt, locale)}
                    </div>
                    <div className="text-2xl font-bold text-navy leading-none">
                      {getDay(event.startsAt)}
                    </div>
                  </div>
                </div>
              )}
              <CardContent className="py-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-navy mb-2">
                  <Clock className="size-4 text-primary" />
                  <span>
                    {formatEventDate(event.startsAt, locale)} &middot;{" "}
                    {formatEventTime(event.startsAt, locale)}
                  </span>
                </div>
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {normalizeEventName(event.name, locale)}
                </h3>
                {event.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                )}
                {event.church_center_url && (
                  <a
                    href={event.church_center_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-auto pt-4 text-primary hover:underline text-sm font-medium"
                  >
                    {t("learnMore")}
                    <ChevronRight className="size-4 ml-1" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://goodnewsbible.churchcenter.com/calendar?view=gallery"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 bg-transparent"
            >
              {t("viewFullCalendar")}
              <ChevronRight className="size-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
