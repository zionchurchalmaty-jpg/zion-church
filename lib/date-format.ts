import { format, formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Format date in Russian: "15 января 2025"
 */
export function formatDateRu(date: Date): string {
  return format(date, "d MMMM yyyy", { locale: ru });
}

/**
 * Format short date in Russian: "15 янв"
 */
export function formatDateShortRu(date: Date): string {
  return format(date, "d MMM", { locale: ru });
}

/**
 * Format time in 24-hour format: "18:00"
 */
export function formatTimeRu(date: Date): string {
  return format(date, "HH:mm");
}

/**
 * Format full datetime: "15 января 2025, 18:00"
 */
export function formatDateTimeRu(date: Date): string {
  return format(date, "d MMMM yyyy, HH:mm", { locale: ru });
}

/**
 * Format date range: "15 - 17 января 2025" or "15 января - 17 февраля 2025"
 */
export function formatDateRangeRu(start: Date, end: Date): string {
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${format(start, "d", { locale: ru })} - ${format(end, "d MMMM yyyy", { locale: ru })}`;
  }
  if (sameYear) {
    return `${format(start, "d MMMM", { locale: ru })} - ${format(end, "d MMMM yyyy", { locale: ru })}`;
  }
  return `${formatDateRu(start)} - ${formatDateRu(end)}`;
}

/**
 * Relative time in Russian: "через 3 дня", "2 часа назад"
 */
export function formatRelativeRu(date: Date): string {
  return formatDistance(date, new Date(), { addSuffix: true, locale: ru });
}

/**
 * Format weekday in Russian: "понедельник"
 */
export function formatWeekdayRu(date: Date): string {
  return format(date, "EEEE", { locale: ru });
}

/**
 * Get weekday name by number (0 = Sunday, 1 = Monday, etc.)
 */
export const WEEKDAY_NAMES_RU = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
] as const;

/**
 * Short weekday names
 */
export const WEEKDAY_NAMES_SHORT_RU = [
  "Вс",
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
] as const;
