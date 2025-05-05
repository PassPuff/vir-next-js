import Image from "next/image";
import { Link } from "@/i18n/routing";
import Container from "@/components/shared/Container";
import { fetchAPI } from "@/lib/api/fetch-api";
import { notFound } from "next/navigation";
import qs from "qs";
import { ProductsProps } from "@/types";

type Props = {
  params: Promise<{ category: string; locale: string }>;
};

const createQueryProduct = (locale: string, category: string) =>
  qs.stringify({
    filters: {
      category: {
        slug: {
          $eq: category,
        },
      },
    },
    locale: locale,
  });

export default async function CategoryPage({ params }: Props) {
  const { category, locale } = await params;

  const query = createQueryProduct(locale, category);
  const data = await fetchAPI(`/api/products?${query}`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (!data) notFound();

  const products: ProductsProps[] = data?.data || [];

  return (
    <section>
      <Container>
        <header className="pb-10 max-w-lg">
          <h1 className="text-4xl font-bold py-3">
            List products{" "}
            <span className="text-yellow-500">
              {products[0]?.category?.name}
            </span>
          </h1>
          <p>{products[0]?.category?.description}</p>
        </header>

        <ul className="grid grid-cols-3 gap-10">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                className="block h-full p-4 bg-gray-100 rounded-2xl transition duration-300 ease-in-out
                hover:bg-gray-200
                focus:bg-gray-200"
                href={`/src/app/%5Blocale%5D/catalog/${category}/${product.slug}`}
              >
                <h2 className="text-xl font-bold pb-3">{product.name}</h2>
                <Image
                  src={product?.image?.url || "/icon-512.png"}
                  alt={product.name}
                  width={500}
                  height={500}
                ></Image>
                <div>
                  {product?.order_price && (
                    <p>Order Price: {product.order_price} &euro;</p>
                  )}
                  {product?.stock_price && (
                    <p>Stock Price: {product.stock_price} &euro;</p>
                  )}
                  {product?.new_price && (
                    <p>New Price: {product.new_price} &euro;</p>
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
