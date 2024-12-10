import Container from "@/components/shared/Container";
import { getProducts } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocalsStrapi } from "@/lib/strapi";

type Props = {
  params: Promise<{ category: string; locale: string }>;
};

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ locale: string }[]> {
  const locales = await getLocalsStrapi();

  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categories`,
  );

  const categories = await categoriesRes.json();

  // Для каждой локали генерируем категорию
  return locales.flatMap((locale) =>
    categories.data.map((category: { slug: string }) => ({
      locale,
      category: category.slug,
    })),
  );
}

export default async function CategoryPage({ params }: Props) {
  const { category, locale } = await params;

  // Получаем продукты для текущей локали
  const products = await getProducts(locale);

  if (!products) notFound();

  const filteredProducts = products.filter(
    (product) => product.category.slug === category,
  );
  return (
    <section>
      <Container>
        <h1 className="text-4xl font-bold pb-3">{category}</h1>
        <ul className="grid grid-cols-2 gap-5">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Link href={`/${locale}/catalog/${category}/${product.slug}`}>
                <h2 className="text-2xl font-bold pb-3">{product.name}</h2>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_API_URL +
                    product.imageMain.url
                  }
                  alt={product.name}
                  width={500}
                  height={500}
                ></Image>
                {
                  <div>
                    <p>Order Price: {product.orderPrice}</p>
                    <p>Stock Price: {product.stockPrice}</p>
                    <p>New Price: {product.newPrice}</p>
                  </div>
                }
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
