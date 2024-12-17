import { getLocalsStrapi } from "@/lib/api/get-locales";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/shared/Container";
import fetchApi from "@/lib/api/strapi";
import Product from "@/interfaces/product";

type Props = {
  params: Promise<{ locale: string; category: string; product: string }>;
};

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ locale: string }[]> {
  const locales = await getLocalsStrapi();
  const products = await fetchApi<Product[]>({
    endpoint: "products",
    wrappedByKey: "data",
    query: {
      "populate[imageMain][fields][0]": "url",
      "populate[category][fields][0]": "slug",
    },
  });

  // Для каждой локали генерируем продукт
  return locales.flatMap((locale) =>
    products.map((product: { slug: string; category: { slug: string } }) => ({
      locale,
      category: product.category.slug,
      product: product.slug,
    })),
  );
}

export default async function ProductPage({ params }: Props) {
  const { locale, product } = await params;

  const result = await fetchApi<Product[]>({
    endpoint: "products",
    wrappedByKey: "data",
    query: {
      "fields[0]": "name",
      "fields[1]": "description",
      "populate[imageMain][fields][0]": "url",
      "populate[category][fields][0]": "slug",
      "filters[slug][$eq]": product,
    },
    locale,
  });

  if (!result) notFound();

  return (
    <section>
      <Container className="relative grid grid-cols-12 auto-rows-auto grid-flow-col dense gap-x-2.5">
        <h1 className=" col-span-6 max-w-2xl text-4xl font-bold">
          {result[0].name}
        </h1>
        <p className="col-span-6 grid-row-span-2  text-lg">
          {result[0].description}
        </p>

        {result[0].imageMain && (
          <Image
            className="col-span-6 row-span-2"
            src={process.env.STRAPI_API_URL + result[0].imageMain.url}
            alt={result[0].name}
            width={500}
            height={500}
          />
        )}
      </Container>
    </section>
  );
}
