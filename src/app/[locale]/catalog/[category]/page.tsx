// import qs from "qs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocalsStrapi } from "@/lib/strapi";
import { getProducts } from "@/lib/strapi";
import Container from "@/components/shared/Container";

type Props = {
  params: Promise<{ category: string; locale: string }>;
};

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ locale: string }[]> {
  // const ourQuery = qs.stringify({
  //   filters: {
  //     locale,
  //   },
  // });

  const locales = await getLocalsStrapi();
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categories`,
  );

  if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

  const categories = await categoriesRes.json();

  // console.log(categories.data);

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
        <header className="pb-10 max-w-lg">
          <h1 className="text-4xl font-bold pb-3">
            List products{" "}
            <span className="text-yellow-500">
              {filteredProducts[0].category.name}
            </span>
          </h1>
          <p>{filteredProducts[0].category.description}</p>
        </header>

        <ul className="grid grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Link
                className="block p-4 bg-gray-100 rounded-2xl transition duration-300 ease-in-out
                hover:bg-gray-200
                focus:bg-gray-200"
                href={`/${locale}/catalog/${category}/${product.slug}`}
              >
                <h2 className="text-xl font-bold pb-3">{product.name}</h2>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_API_URL +
                    product.imageMain.url
                  }
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
