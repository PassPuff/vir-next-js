import fetchApi from "@/lib/api/strapi";
import type { Locales } from "@/types/locales";

export async function getLocalsStrapi(): Promise<string[]> {
  const locales = await fetchApi<Locales[]>({
    endpoint: "i18n/locales",
  });

  return locales.map((locale) => locale.code) as string[];
}
