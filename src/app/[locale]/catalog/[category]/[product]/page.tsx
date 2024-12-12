import { getLocalsStrapi } from "@/lib/api/get-locales";
import { getProducts } from "@/lib/api/get-products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/shared/Container";

type Props = {
  params: Promise<{ locale: string; category: string; product: string }>;
};

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ locale: string }[]> {
  const locales = await getLocalsStrapi();

  const productsRes = await fetch(
    `${process.env.STRAPI_API_URL}/api/products?populate=category`,
  );
  if (!productsRes.ok) throw new Error("Failed to fetch products");
  const products = await productsRes.json();

  // Для каждой локали генерируем продукт
  return locales.flatMap((locale) =>
    products.data.map(
      (product: { slug: string; category: { slug: string } }) => ({
        locale,
        category: product.category.slug,
        product: product.slug,
      }),
    ),
  );
}

export default async function ProductPage({ params }: Props) {
  const { locale, product } = await params;

  const products = await getProducts(locale);

  if (!products) notFound();

  const productFound = products.find((item) => item.slug === product);

  if (!productFound) notFound();

  return (
    <section>
      <Container className="relative grid grid-cols-12 auto-rows-auto grid-flow-col dense gap-x-2.5">
        <h1 className=" col-span-6 max-w-2xl text-4xl font-bold">
          {productFound.name}
        </h1>
        <p className="col-span-6 grid-row-span-2  text-lg">
          {productFound.description}
        </p>

        {productFound.imageMain && (
          <Image
            className="col-span-6 row-span-2"
            src={process.env.STRAPI_API_URL + productFound.imageMain.url}
            alt={productFound.name}
            width={500}
            height={500}
          />
        )}
      </Container>
    </section>
  );
}
