import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/shared/Container";
import qs from "qs";
import { fetchAPI } from "@/lib/fetch-api";

type Props = {
  params: Promise<{ locale: string; category: string; product: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { product } = await params;

  return {
    title: `${product.replaceAll("-", " ").toUpperCase()}`,
  };
}

export const revalidate = 60;

const queryProduct = (locale: string, product?: string) =>
  qs.stringify({
    populate: {
      imageMain: {
        fields: ["url", "alternativeText"],
      },
      category: {
        fields: ["slug"],
      },
    },
    filters: {
      slug: {
        $eq: product,
      },
    },
    locale: locale,
  });

export async function generateStaticParams({ params }: Props) {
  const { locale } = await params;
  const { data } = await fetchAPI(
    `api/products?populate[category][fields][0]=slug&fields[0]=slug&locale=${locale}`,
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    },
  );

  if (!data) notFound();

  // Для каждой локали генерируем продукт
  return data.map((product: { slug: string; category: { slug: string } }) => ({
    locale,
    category: product.category.slug,
    product: product.slug,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { locale, product } = await params;

  const query = queryProduct(locale, product);

  const result = await fetchAPI(`/api/products?${query}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  const products = result.data[0];

  if (!products) notFound();

  return (
    <section>
      <Container className="relative grid grid-cols-12 auto-rows-auto grid-flow-col dense gap-x-2.5">
        <h1 className=" col-span-6 max-w-2xl text-4xl font-bold">
          {products.name}
        </h1>
        <p className="col-span-6 grid-row-span-2  text-lg">
          {products.description}
        </p>

        {products.imageMain && (
          <Image
            className="col-span-6 row-span-2"
            src={process.env.STRAPI_API_URL + products.imageMain.url}
            alt={products.name}
            width={500}
            height={500}
          />
        )}
      </Container>
    </section>
  );
}
