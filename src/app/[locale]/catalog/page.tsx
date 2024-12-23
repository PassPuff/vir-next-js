import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import type Catalog from "@/interfaces/catalog";
import qs from "qs";
import { fetchAPI } from "@/lib/fetch-api";
import { notFound } from "next/navigation";

export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string }>;
};

const createQueryCatalog = (locale: string) =>
  qs.stringify({
    locale: locale,
    fields: ["name", "description", "slug", "locale"],
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });

async function getCatalog(locale: string) {
  const query = createQueryCatalog(locale);
  const data = await fetchAPI(`/api/categories?${query}`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  });

  if (!data) notFound();

  // const blocks = data?.data?.blocks || [];
  // return { blocks };

  return data?.data || null;
}

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params;

  const data = await getCatalog(locale);

  return (
    <section>
      <Container>
        <h1 className="text-4xl font-bold pb-10 text-center">
          Catalog Page
          <br />
          <span className="text-yellow-500"> Locale: {locale}</span>
        </h1>
        <ul className="grid grid-cols-3 gap-10">
          {data.map((catalog: Catalog) => (
            <li key={catalog.id}>
              <Link
                className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl transition duration-300 ease-in-out
                hover:bg-gray-200
                focus:bg-gray-200"
                href={`/${locale}/catalog/${catalog.slug}`}
                key={catalog.slug}
              >
                <h2 className="font-bold pb-3 text-2xl">{catalog.name}</h2>
                {catalog.image && (
                  <Image
                    src={process.env.STRAPI_API_URL + catalog.image.url}
                    alt={catalog.name}
                    width={500}
                    height={500}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
