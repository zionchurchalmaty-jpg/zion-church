import type {
  CalendarEvent,
  CalendarEventWithNextOccurrence,
} from "@/lib/firestore/types";
import { Link } from "@/i18n/navigation";
import { formatDateRu, formatTimeRu } from "@/lib/date-format";
import { Calendar, Clock } from "lucide-react";
import { Timestamp } from "firebase/firestore";

function firestoreToDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Timestamp) return value.toDate();
  const obj = value as { seconds?: number; toDate?: () => Date };
  if (typeof obj.toDate === "function") return obj.toDate();
  if (typeof obj.seconds === "number") return new Date(obj.seconds * 1000);
  return undefined;
}

// Type guard to check if event has nextOccurrence
function hasNextOccurrence(
  event: CalendarEvent | CalendarEventWithNextOccurrence
): event is CalendarEventWithNextOccurrence {
  return "nextOccurrence" in event;
}

function stripHtmlAndTruncate(html: string, maxLength: number = 150): string {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

interface EventCardProps {
  event: CalendarEvent | CalendarEventWithNextOccurrence;
}

export function EventCard({ event }: EventCardProps) {
  const displayDate =
    hasNextOccurrence(event) && event.nextOccurrence
      ? firestoreToDate(event.nextOccurrence)
      : firestoreToDate(event.eventDate);

  const eventDate = firestoreToDate(event.eventDate);
  const customUrl = event.seo?.canonicalUrl || (event as any).canonicalUrl;
  const eventHref = customUrl ? customUrl : `/events/${event.slug}`;

  return (
    <article className="group border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all bg-white flex flex-col">
      <Link href={eventHref} className="flex flex-col h-full">
        {event.coverImage && (
          <div className="aspect-video overflow-hidden relative">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Date badge overlay */}
            {displayDate && (
              <div className="absolute bottom-3 left-3 bg-primary-orange text-white px-3 py-1.5 rounded-md shadow-lg">
                <span className="text-sm font-medium">
                  {formatDateRu(displayDate).split(" ").slice(0, 2).join(" ")}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col flex-1 p-5">
          {/* Date and time info */}
          {displayDate && (
            <div className="flex items-center gap-3 text-sm text-primary-orange mb-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDateRu(displayDate)}</span>
              </div>
              {!event.isAllDay && eventDate && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeRu(eventDate)}</span>
                </div>
              )}
              {event.isAllDay && (
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                  Весь день
                </span>
              )}
            </div>
          )}

          <h2 className="text-lg font-semibold group-hover:text-primary transition-colors text-navy mb-2 line-clamp-2">
            {event.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
            {event.excerpt ||
              event.seo?.metaDescription ||
              stripHtmlAndTruncate(event.content)}
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t">
            {event.tags && event.tags.length > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                {event.tags[0]}
              </span>
            )}
            {event.repeatSettings?.repeatType !== "none" && (
              <span className="text-xs text-muted-foreground">Повторяется</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
