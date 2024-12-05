import type Product from "@/interfaces/product";
import type Catalog from "@/interfaces/catalog";
import type Main from "@/interfaces/main";

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

  const url = new URL(`${process.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const res = await fetch(url.toString());
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
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

export async function getCategories(locale: string) {
  return await fetchApi<Catalog[]>({
    endpoint: "categories",
    query: {
      populate: "*", // Include all relations
      locale,
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

export async function getMainPage(locale: string) {
  return await fetchApi<Main>({
    endpoint: "main",
    query: {
      locale,
    },
    wrappedByKey: "data",
  });
}
