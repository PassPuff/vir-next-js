import type Product from "@/interfaces/product";
import fetchApi from "@/lib/api/strapi";

export async function getProducts(locale: string) {
  return await fetchApi<Product[]>({
    endpoint: "products",
    query: {
      populate: "*", // Include all relations
    },
    locale,

    wrappedByKey: "data",
  });
}
