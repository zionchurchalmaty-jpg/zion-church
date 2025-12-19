import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed", // English at /, Russian at /ru
});

export type Locale = (typeof routing.locales)[number];
