"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EventForm } from "@/components/admin/event-form";
import { getContentById } from "@/lib/firestore/content";
import type { CalendarEvent } from "@/lib/firestore/types";
import { Loader2 } from "lucide-react";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      if (!params.id) return;

      try {
        const data = await getContentById(params.id as string);
        if (data && data.contentType === "event") {
          setEvent(data as CalendarEvent);
        } else {
          router.push("/admin/events");
        }
      } catch (error) {
        console.error("Failed to load event:", error);
        router.push("/admin/events");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-orange" />
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return <EventForm initialData={event} isEditing />;
}
