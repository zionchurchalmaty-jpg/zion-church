import { Suspense } from "react";
import { getPublishedEvents } from "@/lib/firestore/content";
import type { CalendarEvent, ContentLanguage, CalendarEventWithNextOccurrence } from "@/lib/firestore/types";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { EventListClient } from "@/components/events/event-list-client";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Timestamp } from "firebase/firestore";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "eventsPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export const revalidate = 300;

function getUniqueTags(events: CalendarEvent[]): string[] {
  const tagsSet = new Set<string>();
  events.forEach((event) => {
    event.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

function firestoreToDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Timestamp) return value.toDate();
  const obj = value as { seconds?: number; toDate?: () => Date };
  if (typeof obj.toDate === "function") return obj.toDate();
  if (typeof obj.seconds === "number") return new Date(obj.seconds * 1000);
  return undefined;
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("eventsPage");

  const allEventsRaw = await getPublishedEvents(false);
  
  const localeEvents = allEventsRaw.filter(
    (event) => event.language === (locale as ContentLanguage)
  );

  const now = new Date().getTime();
  const upcoming: CalendarEventWithNextOccurrence[] = [];
  const past: CalendarEventWithNextOccurrence[] = [];

  localeEvents.forEach((event) => {
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

  const sortedEvents = [...upcoming, ...past];
  const tags = getUniqueTags(sortedEvents);

  return (
    <div className="bg-cream pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            {t("backToHome")}
          </Link>

          <header className="mb-12">
            <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 text-navy">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground">{t("description")}</p>
          </header>

          <Suspense fallback={<EventListSkeleton />}>
            <EventListClient events={sortedEvents} availableTags={tags} pastEventIds={past.map(p => p.id)} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function EventListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-8">
        <div className="h-10 bg-muted rounded flex-1 animate-pulse" />
        <div className="h-10 bg-muted rounded w-40 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg overflow-hidden bg-white">
            <div className="aspect-video bg-muted animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
              <div className="h-5 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}