import { notFound } from "next/navigation";
// import Container from "@/components/shared/Container";
import qs from "qs";
import { fetchAPI } from "@/lib/fetch-api";
// import BlockTabs from "@/components/shared/Product/Tabs";
import Summary from "@/components/shared/Product/Summary";

type Props = {
  params: Promise<{ locale: string; category: string; product: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { product } = await params;

  return {
    title: `${product.replaceAll("-", " ").toUpperCase()}`,
  };
}

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
      next: { revalidate: 60 },
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
    next: { revalidate: 60 },
  });

  const products = result.data[0];

  if (!products) notFound();

  return (
    <>
      <Summary products={products} />

      {/*<BlockTabs />*/}
    </>
  );
}
