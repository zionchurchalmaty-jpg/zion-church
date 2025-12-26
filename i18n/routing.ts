import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"] as const,
  defaultLocale: "ru",
  localePrefix: "as-needed", // English at /, Russian at /ru
});

export type Locale = (typeof routing.locales)[number];
