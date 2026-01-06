import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, Clock, Repeat } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedContentBySlug, getPublishedEvents } from "@/lib/firestore/content";
import type { CalendarEvent } from "@/lib/firestore/types";
import { formatDateRu, formatTimeRu, formatDateRangeRu, WEEKDAY_NAMES_RU } from "@/lib/date-format";
import sanitizeHtml from "sanitize-html";
import { Timestamp } from "firebase/firestore";

/**
 * Helper to convert Firestore date field to JavaScript Date
 * Handles both proper Timestamps and plain objects with seconds/nanoseconds
 */
function firestoreToDate(value: unknown): Date | undefined {
  if (!value) return undefined;

  if (value instanceof Timestamp) {
    return value.toDate();
  }

  const obj = value as { seconds?: number; nanoseconds?: number; toDate?: () => Date };
  if (typeof obj.toDate === "function") {
    return obj.toDate();
  }
  if (typeof obj.seconds === "number") {
    return new Date(obj.seconds * 1000);
  }

  return undefined;
}

interface EventPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const events = await getPublishedEvents(false); // Get all published events
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const event = (await getPublishedContentBySlug("event", slug)) as CalendarEvent | null;

  if (!event) {
    return { title: "Event Not Found" };
  }

  const description =
    event.excerpt ||
    event.seo?.metaDescription ||
    event.content.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: event.seo?.metaTitle || `${event.title} - Церковь Сион`,
    description,
    openGraph: {
      title: event.seo?.metaTitle || event.title,
      description,
      type: "website",
      images: event.seo?.ogImage || event.coverImage ? [event.seo?.ogImage || event.coverImage!] : undefined,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const event = (await getPublishedContentBySlug("event", slug)) as CalendarEvent | null;

  if (!event) {
    notFound();
  }

  const t = await getTranslations("eventsPage");

  const eventDate = firestoreToDate(event.eventDate);
  const endDate = firestoreToDate(event.endDate);

  // Sanitize HTML content
  const sanitizedContent = sanitizeHtml(event.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'class'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
      '*': ['class', 'style'],
    },
  });

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-[rgb(var(--secondary-navy))]">
          {event.coverImage && (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              priority
              className="object-cover opacity-40"
              unoptimized
            />
          )}
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <div className="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/events"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("backToEvents")}
        </Link>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Date/Time Info Card */}
          {eventDate && (
            <div className="bg-primary-orange/10 border-l-4 border-primary-orange rounded-r-lg p-6 mb-8">
              <div className="flex flex-wrap items-center gap-4 text-navy">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary-orange" />
                  <span className="font-medium">
                    {endDate && endDate.getTime() !== eventDate.getTime()
                      ? formatDateRangeRu(eventDate, endDate)
                      : formatDateRu(eventDate)}
                  </span>
                </div>

                {!event.isAllDay && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-orange" />
                    <span>
                      {formatTimeRu(eventDate)}
                      {endDate && endDate.getTime() !== eventDate.getTime() && (
                        <> - {formatTimeRu(endDate)}</>
                      )}
                    </span>
                  </div>
                )}

                {event.isAllDay && (
                  <span className="px-3 py-1 bg-white rounded-full text-sm">
                    {t("allDay")}
                  </span>
                )}

                {event.repeatSettings?.repeatType !== "none" && (
                  <div className="flex items-center gap-2">
                    <Repeat className="h-5 w-5 text-primary-orange" />
                    <span className="text-sm">
                      {event.repeatSettings?.repeatType === "weekly"
                        ? `Каждую неделю: ${event.repeatSettings.weeklyDays
                            ?.map((d) => WEEKDAY_NAMES_RU[d])
                            .join(", ")}`
                        : "Повторяется"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Excerpt */}
          {event.excerpt && (
            <div className="bg-white border rounded-lg p-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">{event.excerpt}</p>
            </div>
          )}

          {/* Full Content */}
          <div
            className="prose prose-lg max-w-none mb-8 prose-headings:text-navy prose-headings:font-serif prose-a:text-primary-orange prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
