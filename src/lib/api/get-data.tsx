import fetchApi from "./strapi";
import { HomePageProps, ProductsProps, CategoryProps } from "@/types";

// Получаем все категории
export const getCategories = async (locale: string) => {
  return await fetchApi<CategoryProps[]>({
    endpoint: "categories",
    locale,
    next: {
      cache: "force-cache",
      tags: ["categories"],
    },
    wrappedByKey: "data",
  });
};

// Получаем главную страницу
export const getHomePage = async (locale: string) => {
  return await fetchApi<HomePageProps>({
    endpoint: "home-page",
    locale,
    wrappedByKey: "data",
    next: {
      cache: "force-cache",
      tags: ["home-page"],
    },
  });
};

// продукты по категориям
export const getProductsByCategory = async (
  locale: string,
  category: string,
) => {
  return await fetchApi<ProductsProps[]>({
    endpoint: "products",
    query: {
      // фильтрация по slug категории
      "filters[category][slug][$eq]": category,
    },
    locale,
    wrappedByKey: "data",
    next: {
      cache: "force-cache",
      tags: ["products"],
    },
  });
};

// поиск продуктов
export const getSearchProducts = async (query: string) => {
  return await fetchApi<ProductsProps[]>({
    endpoint: "products",
    query: {
      "filters[$or][0][name][$containsi]": query,
      "filters[$or][1][description][$containsi]": query,
    },
    locale: "en",
    wrappedByKey: "data",
  });
};
