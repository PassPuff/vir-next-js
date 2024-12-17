import type Catalog from "@/interfaces/catalog";
import fetchApi from "@/lib/api/strapi";

export async function getCategories(locale?: string) {
  return await fetchApi<Catalog[]>({
    endpoint: "categories",
    locale,
    wrappedByKey: "data",
  });
}
