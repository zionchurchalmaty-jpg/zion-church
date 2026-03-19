import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { formatDateShortRu } from "@/lib/date-format";
import { getPublishedEvents } from "@/lib/firestore/content";
import type { CalendarEventWithNextOccurrence } from "@/lib/firestore/types";
import { Timestamp } from "firebase/firestore";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { unstable_noStore as noStore } from "next/cache";

function firestoreToDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Timestamp) return value.toDate();
  const obj = value as { seconds?: number; toDate?: () => Date };
  if (typeof obj.toDate === "function") return obj.toDate();
  if (typeof obj.seconds === "number") return new Date(obj.seconds * 1000);
  return undefined;
}

function getDisplayDate(
  event: CalendarEventWithNextOccurrence,
): Date | undefined {
  return event.nextOccurrence
    ? firestoreToDate(event.nextOccurrence)
    : firestoreToDate(event.eventDate);
}

function formatEventDateRange(start?: Date, end?: Date): string {
  if (!start) return "";
  if (!end) return formatDateShortRu(start);

  if (start.toDateString() === end.toDateString()) {
    return formatDateShortRu(start);
  }

  return `${formatDateShortRu(start)} - ${formatDateShortRu(end)}`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export async function CalendarSection() {
  noStore();

  const t = await getTranslations("calendar");

  const allEvents = await getPublishedEvents(false);

  const now = new Date().getTime();
  const upcoming: CalendarEventWithNextOccurrence[] = [];
  const past: CalendarEventWithNextOccurrence[] = [];

  allEvents.forEach((event) => {
    const startTime = firestoreToDate(event.eventDate)?.getTime() || 0;
    const endTime = event.endDate
      ? firestoreToDate(event.endDate)?.getTime() || startTime
      : startTime;

    const isOngoing = startTime <= now && endTime >= now;
    const hasFutureOccurrence = event.nextOccurrence !== null;

    if (hasFutureOccurrence || isOngoing || startTime >= now) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });

  upcoming.sort((a, b) => {
    const aTime = a.nextOccurrence
      ? a.nextOccurrence.seconds * 1000
      : firestoreToDate(a.eventDate)?.getTime() || 0;
    const bTime = b.nextOccurrence
      ? b.nextOccurrence.seconds * 1000
      : firestoreToDate(b.eventDate)?.getTime() || 0;
    return aTime - bTime;
  });

  past.sort((a, b) => {
    const aTime = firestoreToDate(a.eventDate)?.getTime() || 0;
    const bTime = firestoreToDate(b.eventDate)?.getTime() || 0;
    return bTime - aTime;
  });

  const displayEvents = [...upcoming, ...past].slice(0, 6);

  if (displayEvents.length === 0) {
    return (
      <section id="calendar" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="text-center py-12">
            <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t("noUpcomingEvents")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calendar" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayEvents.map((event) => {
            const startDate = getDisplayDate(event);
            let endDate = event.endDate
              ? firestoreToDate(event.endDate)
              : undefined;

            if (startDate && endDate && event.nextOccurrence) {
              const originalStart =
                firestoreToDate(event.eventDate)?.getTime() || 0;
              const originalEnd = endDate.getTime();
              const duration = originalEnd - originalStart;
              endDate = new Date(startDate.getTime() + duration);
            }

            const description =
              event.excerpt || stripHtml(event.content).slice(0, 150) + "...";
            const customUrl = event.seo?.canonicalUrl || event.canonicalUrl;
            const eventHref = customUrl ? customUrl : `/events/${event.slug}`;
            const isPastEvent = past.some((p) => p.id === event.id);

            return (
              <Link
                key={event.id}
                href={eventHref}
                className={`block transition-all duration-300 ${
                  isPastEvent ? "opacity-75 grayscale-[30%]" : ""
                }`}
              >
                <Card className="bg-cream hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col h-full pt-0! gap-0!">
                  <div className="relative aspect-video overflow-hidden">
                    {event.coverImage ? (
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-navy/10 flex items-center justify-center">
                        <CalendarIcon className="w-12 h-12 text-navy/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />

                    {startDate && (
                      <div
                        className={`absolute bottom-4 left-4 rounded-lg px-3 py-2 shadow-lg ${
                          isPastEvent ? "bg-gray-600" : "bg-primary-orange"
                        }`}
                      >
                        <span className="text-white text-sm font-medium">
                          {formatEventDateRange(startDate, endDate)}
                          {isPastEvent && " (Прошло)"}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="py-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-navy group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {description}
                    </p>
                    <span
                      className={`inline-flex items-center mt-auto pt-4 text-sm font-medium ${
                        isPastEvent ? "text-gray-500" : "text-primary"
                      }`}
                    >
                      {t("learnMore")}
                      <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/events">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 bg-transparent hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-colors"
            >
              {t("viewAllEvents")}
              <ChevronRight className="size-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
