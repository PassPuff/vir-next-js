import Image from "next/image";
// import Link from "next/link";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import type Catalog from "@/interfaces/catalog";
import qs from "qs";
import { fetchAPI } from "@/lib/fetch-api";
import Product from "@/interfaces/product";

type Props = {
  params: Promise<{ category: string; locale: string }>;
};

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { category } = await params;

  return {
    title: `Category  ${category.replaceAll("-", " ")}`,
  };
}

const createQueryCatalog = (locale: string) =>
  qs.stringify({
    locale: locale,
    fields: ["slug", "locale"],
  });

const createQueryProduct = (locale: string, category: string) =>
  qs.stringify({
    populate: {
      imageMain: {
        fields: ["url", "alternativeText"],
      },
      category: {
        fields: ["slug", "name", "description"],
      },
    },
    filters: {
      category: {
        slug: {
          $eq: category,
        },
      },
    },
    locale: locale,
  });

export async function generateStaticParams({ params }: Props) {
  const { locale } = await params;
  const query = createQueryCatalog(locale);
  const categories = await fetchAPI(`/api/categories?${query}`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (!categories) notFound();

  return categories.data.map((category: Catalog) => ({
    category: category.slug,
    locale: category.locale,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category, locale } = await params;

  const query = createQueryProduct(locale, category);
  const data: { data: Product[] } = await fetchAPI(`/api/products?${query}`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (!data) notFound();

  const products = data?.data || [];

  console.log(products);

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
                className="block h-full p-4 bg-gray-100 rounded-2xl transition duration-300 ease-in-out
                hover:bg-gray-200
                focus:bg-gray-200"
                href={`/catalog/${category}/${product.slug}`}
              >
                <h2 className="text-xl font-bold pb-3">{product.name}</h2>
                <Image
                  src={process.env.STRAPI_API_URL + product.imageMain.url}
                  alt={product.name}
                  width={500}
                  height={500}
                ></Image>
                <div>
                  {product.orderPrice > 0 && (
                    <p>Order Price: {product.orderPrice} &euro;</p>
                  )}
                  {product.stockPrice > 0 && (
                    <p>Stock Price: {product.stockPrice} &euro;</p>
                  )}
                  {product.newPrice > 0 && (
                    <p>New Price: {product.newPrice} &euro;</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
