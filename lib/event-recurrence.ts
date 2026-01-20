import type { RepeatSettings } from "./firestore/types";

/**
 * Get the next occurrence date for a recurring event
 * @param eventDate - The original event date timestamp (seconds)
 * @param repeatSettings - The event's repeat settings
 * @param fromDate - Calculate next occurrence from this date (defaults to now)
 * @returns The next occurrence as a timestamp object, or null if no future occurrences
 */
export function getNextOccurrence(
  eventDate: { seconds: number; nanoseconds: number },
  repeatSettings: RepeatSettings,
  fromDate: Date = new Date()
): { seconds: number; nanoseconds: number } | null {
  const originalDate = new Date(eventDate.seconds * 1000);

  // Check if recurrence has ended
  if (repeatSettings.recurrenceEndDate) {
    const endDate = new Date(repeatSettings.recurrenceEndDate);
    // Set end date to end of day
    endDate.setHours(23, 59, 59, 999);
    if (fromDate > endDate) {
      return null;
    }
  }

  switch (repeatSettings.repeatType) {
    case "none":
      // Non-recurring: return original date only if it's in the future
      if (originalDate >= fromDate) {
        return eventDate;
      }
      return null;

    case "weekly":
      return getNextWeeklyOccurrence(
        originalDate,
        repeatSettings.weeklyDays || [],
        fromDate,
        repeatSettings.recurrenceEndDate
      );

    case "custom":
      return getNextCustomOccurrence(
        repeatSettings.customDates || [],
        fromDate,
        repeatSettings.recurrenceEndDate
      );

    default:
      return null;
  }
}

/**
 * Get the next occurrence for a weekly recurring event
 * Preserves the original time of day from the event
 */
function getNextWeeklyOccurrence(
  originalDate: Date,
  weeklyDays: number[],
  fromDate: Date,
  recurrenceEndDate?: string
): { seconds: number; nanoseconds: number } | null {
  if (weeklyDays.length === 0) {
    return null;
  }

  // Get the original time components
  const originalHours = originalDate.getHours();
  const originalMinutes = originalDate.getMinutes();
  const originalSeconds = originalDate.getSeconds();

  // Sort days for consistent iteration
  const sortedDays = [...weeklyDays].sort((a, b) => a - b);

  // Start from fromDate
  const today = new Date(fromDate);
  const currentDay = today.getDay(); // 0-6 (Sunday-Saturday)
  const currentTime =
    today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
  const eventTime =
    originalHours * 3600 + originalMinutes * 60 + originalSeconds;

  // Check if any day this week (including today) is valid
  for (const day of sortedDays) {
    if (day > currentDay || (day === currentDay && eventTime > currentTime)) {
      // This day is later this week or today but later time
      const daysUntil = day - currentDay;
      const nextOccurrence = new Date(today);
      nextOccurrence.setDate(today.getDate() + daysUntil);
      nextOccurrence.setHours(originalHours, originalMinutes, originalSeconds, 0);

      // Check if within recurrence end date
      if (recurrenceEndDate) {
        const endDate = new Date(recurrenceEndDate);
        endDate.setHours(23, 59, 59, 999);
        if (nextOccurrence > endDate) {
          continue;
        }
      }

      return {
        seconds: Math.floor(nextOccurrence.getTime() / 1000),
        nanoseconds: 0,
      };
    }
  }

  // No valid day this week, get the first day next week
  const firstDayNextWeek = sortedDays[0];
  const daysUntilNextWeek = 7 - currentDay + firstDayNextWeek;
  const nextOccurrence = new Date(today);
  nextOccurrence.setDate(today.getDate() + daysUntilNextWeek);
  nextOccurrence.setHours(originalHours, originalMinutes, originalSeconds, 0);

  // Check if within recurrence end date
  if (recurrenceEndDate) {
    const endDate = new Date(recurrenceEndDate);
    endDate.setHours(23, 59, 59, 999);
    if (nextOccurrence > endDate) {
      return null;
    }
  }

  return {
    seconds: Math.floor(nextOccurrence.getTime() / 1000),
    nanoseconds: 0,
  };
}

/**
 * Get the next occurrence for a custom dates recurring event
 */
function getNextCustomOccurrence(
  customDates: string[],
  fromDate: Date,
  recurrenceEndDate?: string
): { seconds: number; nanoseconds: number } | null {
  if (customDates.length === 0) {
    return null;
  }

  // Parse and filter future dates
  const futureDates = customDates
    .map((dateStr) => new Date(dateStr))
    .filter((date) => {
      if (date < fromDate) return false;

      // Check recurrence end date
      if (recurrenceEndDate) {
        const endDate = new Date(recurrenceEndDate);
        endDate.setHours(23, 59, 59, 999);
        if (date > endDate) return false;
      }

      return true;
    })
    .sort((a, b) => a.getTime() - b.getTime());

  if (futureDates.length === 0) {
    return null;
  }

  // Return the earliest future date
  const nextDate = futureDates[0];
  return {
    seconds: Math.floor(nextDate.getTime() / 1000),
    nanoseconds: 0,
  };
}

/**
 * Check if an event has any future occurrences
 */
export function hasUpcomingOccurrence(
  eventDate: { seconds: number; nanoseconds: number },
  repeatSettings: RepeatSettings,
  fromDate: Date = new Date()
): boolean {
  return getNextOccurrence(eventDate, repeatSettings, fromDate) !== null;
}
