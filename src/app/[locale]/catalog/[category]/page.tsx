import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocalsStrapi } from "@/lib/api/get-locales";
import Container from "@/components/shared/Container";
import fetchApi from "@/lib/api/strapi";
import type Catalog from "@/interfaces/catalog";
import type Product from "@/interfaces/product";

type Props = {
  params: Promise<{ category: string; locale: string }>;
};

export const dynamicParams = false;
export const revalidate = 60;

export async function generateStaticParams(): Promise<{ locale: string }[]> {
  const locales = await getLocalsStrapi();

  const categories = await fetchApi<Catalog[]>({
    endpoint: "categories",
    wrappedByKey: "data",
    query: {
      "fields[0]": "slug",
    },
  });

  // Для каждой локали генерируем категорию
  return locales.flatMap((locale) =>
    categories.map((category: { slug: string }) => ({
      locale,
      category: category.slug,
    })),
  );
}

export default async function CategoryPage({ params }: Props) {
  const { category, locale } = await params;

  //Получаем продукты для текущей локали
  const products = await fetchApi<Product[]>({
    endpoint: "products",
    query: {
      // "populate[imageMain][fields][0]": "url",
      // "populate[category][fields][0]": "slug",
      populate: "*",
      "filters[category][slug][$eq]": category,
    },
    locale,
    wrappedByKey: "data",
  });

  if (!products) notFound();

  return (
    <section>
      <Container>
        <header className="pb-10 max-w-lg">
          <h1 className="text-4xl font-bold pb-3">
            List products{" "}
            <span className="text-yellow-500">{products[0].category.name}</span>
          </h1>
          <p>{products[0].category.description}</p>
        </header>

        <ul className="grid grid-cols-3 gap-10">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                className="block p-4 bg-gray-100 rounded-2xl transition duration-300 ease-in-out
                hover:bg-gray-200
                focus:bg-gray-200"
                href={`/${locale}/catalog/${category}/${product.slug}`}
              >
                <h2 className="text-xl font-bold pb-3">{product.name}</h2>
                <Image
                  src={process.env.STRAPI_API_URL + product.imageMain.url}
                  alt={product.name}
                  width={500}
                  height={500}
                ></Image>
                <div>
                  <p>Order Price: {product.orderPrice}</p>
                  <p>Stock Price: {product.stockPrice}</p>
                  <p>New Price: {product.newPrice}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
