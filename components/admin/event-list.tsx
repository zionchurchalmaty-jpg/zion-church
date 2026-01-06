"use client";

import { useState } from "react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { CalendarEvent } from "@/lib/firestore/types";
import { Search, Plus, Pencil, ExternalLink, Repeat, Calendar } from "lucide-react";
import { Timestamp } from "firebase/firestore";

// Helper to convert Firestore date field to JavaScript Date
function firestoreToDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Timestamp) return value.toDate();
  const obj = value as { seconds?: number; toDate?: () => Date };
  if (typeof obj.toDate === "function") return obj.toDate();
  if (typeof obj.seconds === "number") return new Date(obj.seconds * 1000);
  return undefined;
}

interface EventListProps {
  items: CalendarEvent[];
}

function formatDate(timestamp: unknown): string {
  const date = firestoreToDate(timestamp);
  if (!date) return "—";
  try {
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "—";
  }
}

function formatEventDate(timestamp: unknown, isAllDay: boolean): string {
  const date = firestoreToDate(timestamp);
  if (!date) return "—";
  try {
    return isAllDay
      ? format(date, "MMM d, yyyy")
      : format(date, "MMM d, yyyy 'at' HH:mm");
  } catch {
    return "—";
  }
}

function isPastEvent(timestamp: unknown): boolean {
  const date = firestoreToDate(timestamp);
  if (!date) return false;
  return date < new Date();
}

function getEventTime(timestamp: unknown): number {
  const date = firestoreToDate(timestamp);
  return date?.getTime() || 0;
}

export function EventList({ items }: EventListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const filteredItems = items.filter((item) => {
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchLower) ||
        item.searchableText.includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false;
    }

    // Time filter (past/upcoming)
    if (timeFilter === "upcoming" && isPastEvent(item.eventDate)) {
      return false;
    }
    if (timeFilter === "past" && !isPastEvent(item.eventDate)) {
      return false;
    }

    return true;
  });

  // Sort by event date (upcoming first)
  const sortedItems = [...filteredItems].sort((a, b) => {
    const dateA = getEventTime(a.eventDate);
    const dateB = getEventTime(b.eventDate);
    return dateA - dateB;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-navy">Events</h1>
        <Button asChild variant="orange">
          <Link href="/admin/events/new">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All events</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Title</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <p className="text-muted-foreground">
                    {search || statusFilter !== "all" || timeFilter !== "all"
                      ? "No events found"
                      : "No events yet. Create your first one!"}
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              sortedItems.map((item) => {
                const isPast = isPastEvent(item.eventDate);
                const hasRepeat = item.repeatSettings?.repeatType !== "none";

                return (
                  <TableRow key={item.id} className={isPast ? "opacity-60" : ""}>
                    <TableCell>
                      <div>
                        <Link
                          href={`/admin/events/${item.id}/edit`}
                          className="font-medium hover:text-primary-orange"
                        >
                          {item.title}
                        </Link>
                        {item.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-accent px-2 py-0.5 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{item.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatEventDate(item.eventDate, item.isAllDay)}
                        </span>
                        {hasRepeat && (
                          <Repeat className="h-3 w-3 text-primary-orange" />
                        )}
                        {item.isAllDay && (
                          <Badge variant="outline" className="text-xs">
                            All day
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant={
                            item.status === "published" ? "default" : "secondary"
                          }
                          className={
                            item.status === "published"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {item.status === "published" ? "Published" : "Draft"}
                        </Badge>
                        {isPast && item.status === "published" && (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            Past
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {item.language === "en" ? "EN" : item.language === "ru" ? "RU" : "—"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(item.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/events/${item.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        {item.status === "published" && (
                          <Link href={`/events/${item.slug}`} target="_blank">
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
