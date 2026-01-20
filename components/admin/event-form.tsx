"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentEditor } from "./content-editor";
import { SEOFields } from "./seo-fields";
import { ImageUpload } from "./image-upload";
import { useAuth } from "./auth-provider";
import { DatePicker, MultiDatePicker } from "@/components/ui/date-picker";
import { createEvent, updateEvent, deleteContent } from "@/lib/firestore/content";
import type {
  CalendarEvent,
  CalendarEventInput,
  SEOData,
  ContentStatus,
  ContentLanguage,
  RepeatType,
  RepeatSettings,
} from "@/lib/firestore/types";
import { Timestamp } from "firebase/firestore";
import { Loader2, Save, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Helper to convert Firestore date field to JavaScript Date
 * Handles both proper Timestamps and plain objects with seconds/nanoseconds
 */
function firestoreToDate(value: unknown): Date | undefined {
  if (!value) return undefined;

  // Proper Firestore Timestamp
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  // Plain object with toDate method or seconds/nanoseconds
  const obj = value as { seconds?: number; nanoseconds?: number; toDate?: () => Date };
  if (typeof obj.toDate === "function") {
    return obj.toDate();
  }
  if (typeof obj.seconds === "number") {
    return new Date(obj.seconds * 1000);
  }

  return undefined;
}

interface EventFormProps {
  initialData?: CalendarEvent;
  isEditing?: boolean;
}

export function EventForm({ initialData, isEditing = false }: EventFormProps) {
  const router = useRouter();
  const { user } = useAuth();

  // Standard content fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || ""
  );
  const [status, setStatus] = useState<ContentStatus>(
    initialData?.status || "draft"
  );
  const [language, setLanguage] = useState<string>(initialData?.language || "");
  const [seo, setSeo] = useState<SEOData>(
    initialData?.seo || {
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
      canonicalUrl: "",
      noIndex: false,
    }
  );

  // Event-specific fields
  const initialEventDate = firestoreToDate(initialData?.eventDate);
  const initialEndDate = firestoreToDate(initialData?.endDate);

  const [eventDate, setEventDate] = useState<Date | undefined>(initialEventDate);
  const [eventTime, setEventTime] = useState<string>(
    initialEventDate
      ? `${String(initialEventDate.getHours()).padStart(2, "0")}:${String(initialEventDate.getMinutes()).padStart(2, "0")}`
      : "10:00"
  );
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);
  const [endTime, setEndTime] = useState<string>(
    initialEndDate
      ? `${String(initialEndDate.getHours()).padStart(2, "0")}:${String(initialEndDate.getMinutes()).padStart(2, "0")}`
      : ""
  );
  const [isAllDay, setIsAllDay] = useState(initialData?.isAllDay || false);
  const [repeatType, setRepeatType] = useState<RepeatType>(
    initialData?.repeatSettings?.repeatType || "none"
  );
  const [weeklyDays, setWeeklyDays] = useState<number[]>(
    initialData?.repeatSettings?.weeklyDays || []
  );
  const [customDates, setCustomDates] = useState<Date[]>(
    initialData?.repeatSettings?.customDates?.map((d) => new Date(d)) || []
  );
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | undefined>(
    initialData?.repeatSettings?.recurrenceEndDate
      ? new Date(initialData.repeatSettings.recurrenceEndDate)
      : undefined
  );

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const parsed = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setTags(parsed);
  };

  const toggleWeekday = (day: number) => {
    setWeeklyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const combineDateTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours || 0, minutes || 0, 0, 0);
    return combined;
  };

  const handleSubmit = async (submitStatus?: ContentStatus) => {
    if (!user) return;

    const finalStatus = submitStatus || status;

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    if (!language) {
      setError("Language is required");
      return;
    }

    if (!eventDate) {
      setError("Event date is required");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      const finalEventDate = isAllDay
        ? eventDate
        : combineDateTime(eventDate, eventTime);

      const finalEndDate =
        endDate && !isAllDay ? combineDateTime(endDate, endTime || "23:59") : endDate;

      const repeatSettings: RepeatSettings = {
        repeatType,
        weeklyDays: repeatType === "weekly" ? weeklyDays : undefined,
        customDates:
          repeatType === "custom"
            ? customDates.map((d) => d.toISOString())
            : undefined,
        recurrenceEndDate:
          repeatType !== "none" && recurrenceEndDate
            ? recurrenceEndDate.toISOString()
            : undefined,
      };

      const input: CalendarEventInput = {
        contentType: "event",
        title: title.trim(),
        content,
        excerpt: excerpt.trim() || undefined,
        coverImage: coverImage.trim() || undefined,
        tags,
        status: finalStatus,
        language: language as ContentLanguage,
        seo,
        eventDate: finalEventDate,
        endDate: finalEndDate,
        isAllDay,
        repeatSettings,
      };

      if (isEditing && initialData) {
        await updateEvent(initialData.id, input);
      } else {
        await createEvent(
          input,
          user.uid,
          user.displayName || user.email || "Unknown"
        );
      }

      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;

    setDeleting(true);
    try {
      await deleteContent(initialData.id);
      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to delete event");
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-navy">
          {isEditing ? "Edit Event" : "New Event"}
        </h1>

        <div className="flex items-center gap-2">
          {isEditing && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete event?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The event will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {deleting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSubmit("draft")}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Draft
          </Button>

          <Button
            size="sm"
            variant="orange"
            onClick={() => handleSubmit("published")}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Eye className="mr-2 h-4 w-4" />
            )}
            Publish
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content area */}
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title..."
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <ContentEditor
              content={content}
              onChange={setContent}
              placeholder="Describe the event..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description for lists and previews..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Optional. Used for previews and lists.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Date/Time Settings */}
          <div className="space-y-4 rounded-lg border bg-card p-4">
            <h3 className="font-medium text-navy">Date & Time</h3>

            <div className="space-y-2">
              <Label>Event Date *</Label>
              <DatePicker
                date={eventDate}
                onDateChange={setEventDate}
                placeholder="Select date"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="all-day"
                checked={isAllDay}
                onCheckedChange={setIsAllDay}
              />
              <Label htmlFor="all-day">All day</Label>
            </div>

            {!isAllDay && (
              <div className="space-y-2">
                <Label htmlFor="event-time">Start Time</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>End Date (optional)</Label>
              <DatePicker
                date={endDate}
                onDateChange={setEndDate}
                placeholder="Select end date"
              />
            </div>

            {!isAllDay && endDate && (
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Repeat Settings */}
          <div className="space-y-4 rounded-lg border bg-card p-4">
            <h3 className="font-medium text-navy">Repeat</h3>

            <div className="space-y-2">
              <Label>Repeat Type</Label>
              <Select
                value={repeatType}
                onValueChange={(v) => setRepeatType(v as RepeatType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No repeat</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom dates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {repeatType === "weekly" && (
              <div className="space-y-2">
                <Label>Days of the week</Label>
                <div className="grid grid-cols-2 gap-2">
                  {WEEKDAY_NAMES.map((name, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${index}`}
                        checked={weeklyDays.includes(index)}
                        onCheckedChange={() => toggleWeekday(index)}
                      />
                      <Label
                        htmlFor={`day-${index}`}
                        className="text-sm font-normal"
                      >
                        {name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {repeatType === "custom" && (
              <div className="space-y-2">
                <Label>Additional dates</Label>
                <MultiDatePicker
                  dates={customDates}
                  onDatesChange={setCustomDates}
                  placeholder="Select dates"
                />
                {customDates.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Dates selected: {customDates.length}
                  </p>
                )}
              </div>
            )}

            {(repeatType === "weekly" || repeatType === "custom") && (
              <div className="space-y-2">
                <Label>End recurrence on (optional)</Label>
                <DatePicker
                  date={recurrenceEndDate}
                  onDateChange={setRecurrenceEndDate}
                  placeholder="No end date"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty for indefinite recurrence
                </p>
              </div>
            )}
          </div>

          {/* General Settings */}
          <div className="space-y-4 rounded-lg border bg-card p-4">
            <h3 className="font-medium text-navy">Settings</h3>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as ContentStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ImageUpload
              value={coverImage}
              onChange={setCoverImage}
              folder="covers"
              label="Cover Image"
              description="Recommended: 1200x630px or 16:9"
              aspectRatio="16/9"
            />

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="tag1, tag2, tag3"
              />
              <p className="text-xs text-muted-foreground">
                Separate tags with commas
              </p>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent px-2 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <SEOFields
            value={seo}
            onChange={setSeo}
            defaultTitle={title}
            coverImage={coverImage}
          />
        </div>
      </div>
    </div>
  );
}
