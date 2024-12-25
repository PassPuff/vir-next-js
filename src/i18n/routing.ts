import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "it", "fr"], // Define in this line the possible languages for translation
  defaultLocale: "en", // Define in this line the default language to be shown
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
