import fetchApi from "./strapi";
import { HomePageProps, ProductsProps } from "@/types";
import { CategoryProps } from "@/types/categories";

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

// Получаем все продукты
export const getAllProducts = async (locale: string) => {
  return await fetchApi<ProductsProps[]>({
    endpoint: "products",
    locale,
    wrappedByKey: "data",
    next: {
      cache: "force-cache",
      tags: ["products"],
    },
  });
};
