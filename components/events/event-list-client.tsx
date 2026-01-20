"use client";

import { useMemo } from "react";
import type { CalendarEvent, CalendarEventWithNextOccurrence } from "@/lib/firestore/types";
import { useEventFilters } from "@/lib/hooks/use-event-filters";
import { EventFiltersComponent } from "./event-filters";
import { EventCard } from "./event-card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface EventListClientProps {
  events: (CalendarEvent | CalendarEventWithNextOccurrence)[];
  availableTags: string[];
}

export function EventListClient({ events, availableTags }: EventListClientProps) {
  const t = useTranslations("eventsPage");

  const {
    filters,
    setFilter,
    clearFilters,
    loadedCount,
    loadMore,
    hasActiveFilters,
  } = useEventFilters();

  // Filter events based on current filters (language already filtered on server)
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          event.searchableText?.includes(searchLower) ||
          event.title.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Tag filter
      if (filters.tag && !event.tags.includes(filters.tag)) {
        return false;
      }

      return true;
    });
  }, [events, filters]);

  // Apply pagination
  const displayedEvents = filteredEvents.slice(0, loadedCount);
  const hasMoreEvents = filteredEvents.length > loadedCount;

  return (
    <>
      <EventFiltersComponent
        filters={filters}
        availableTags={availableTags}
        onFilterChange={setFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {hasActiveFilters ? t("noEventsFiltered") : t("noEventsYet")}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              {t("clearFilters")}
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {hasMoreEvents && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={loadMore} size="lg">
                {t("loadMore")} ({filteredEvents.length - loadedCount}{" "}
                {t("remaining")})
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
