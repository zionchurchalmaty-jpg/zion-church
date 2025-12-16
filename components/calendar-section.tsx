import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUpcomingEvents, type CalendarEvent } from "@/lib/planning-center";
import { Calendar, ChevronRight, Clock } from "lucide-react";

const fallbackEvents: CalendarEvent[] = [
  {
    id: "fallback-1",
    name: "Sunday Worship Service",
    description: "Join us for worship, prayer, and teaching from God's Word.",
    image: null,
    startsAt: new Date(),
    endsAt: new Date(),
  },
  {
    id: "fallback-2",
    name: "Wednesday Bible Study",
    description: "Midweek study and fellowship for all ages.",
    image: null,
    startsAt: new Date(),
    endsAt: new Date(),
  },
  {
    id: "fallback-3",
    name: "Youth Night",
    description: "Games, worship, and Bible study for teens.",
    image: null,
    startsAt: new Date(),
    endsAt: new Date(),
  },
];

function formatEventDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatEventTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getMonthAbbr(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
}

function getDay(date: Date): string {
  return date.getDate().toString();
}

export async function CalendarSection() {
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
              Upcoming Events
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            Church Calendar
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join us for worship, fellowship, and community events
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
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-xs font-bold text-primary uppercase">
                      {getMonthAbbr(event.startsAt)}
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
                      {getMonthAbbr(event.startsAt)}
                    </div>
                    <div className="text-2xl font-bold text-navy leading-none">
                      {getDay(event.startsAt)}
                    </div>
                  </div>
                </div>
              )}
              <CardContent className="py-6 flex flex-col flex-1">
                <h3 className="font-semibold text-xl mb-2 text-navy">
                  {event.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Clock className="size-4" />
                  <span>
                    {formatEventDate(event.startsAt)} at{" "}
                    {formatEventTime(event.startsAt)}
                  </span>
                </div>
                {event.description && (
                  <p className="text-gray-600 leading-relaxed flex-1">
                    {event.description}
                  </p>
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
              View Full Calendar
              <ChevronRight className="size-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
