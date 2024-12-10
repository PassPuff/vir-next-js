import type Product from "@/interfaces/product";
import type Catalog from "@/interfaces/catalog";
import type Main from "@/interfaces/main";
// import Locales from "@/interfaces/locales";

interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337"}/api/${endpoint}`,
  );

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const res = await fetch(url.toString());

  if (!res.ok) throw new Error("Failed to fetch data");

  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}

export async function getLocalsStrapi() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/i18n/locales`,
  );

  if (!res.ok) throw new Error("Failed to fetch locales");

  const locales = await res.json();
  return locales.map((locale: { code: string }) => locale.code) as string[];
}

export async function getMainPage(locale: string) {
  return await fetchApi<Main>({
    endpoint: "main",
    query: {
      populate: "image",
      locale,
    },
    wrappedByKey: "data",
  });
}

export async function getCategories(locale: string) {
  return await fetchApi<Catalog[]>({
    endpoint: "categories",
    query: {
      populate: "image", // Include all relations
      locale,
    },
    wrappedByKey: "data",
  });
}

export async function getProductsWithCategories(locale: string) {
  return await fetchApi<Product[]>({
    endpoint: "products",
    query: {
      populate: "category",
      locale,
    },
    wrappedByKey: "data",
  });
}

export async function getProducts(locale: string) {
  return await fetchApi<Product[]>({
    endpoint: "products",
    query: {
      populate: "*", // Include all relations
      locale: locale || "en",
    },
    wrappedByKey: "data",
  });
}

export async function getProductBySlug(slug: string, locale: string) {
  return await fetchApi<Product[]>({
    endpoint: "products",
    query: {
      filters: `slug=${slug}`,
      populate: "*", // Include all relations
      locale,
    },
    wrappedByKey: "data",
  });
}

export async function getCatalogBySlug(slug: string, locale: string) {
  return await fetchApi<Catalog[]>({
    endpoint: "catalogs",
    query: {
      filters: `slug=${slug}`,
      populate: "*", // Include all relations
      locale,
    },
    wrappedByKey: "data",
  });
}
