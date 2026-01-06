"use client";

import { useEffect, useState } from "react";
import { EventList } from "@/components/admin/event-list";
import { getAllContent } from "@/lib/firestore/content";
import type { CalendarEvent } from "@/lib/firestore/types";
import { Loader2 } from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAllContent({ contentType: "event" });
        setEvents(data as CalendarEvent[]);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
      </div>
    );
  }

  return <EventList items={events} />;
}
