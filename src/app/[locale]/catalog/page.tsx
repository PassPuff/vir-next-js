import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import fetchApi from "@/lib/api/strapi";
import type Catalog from "@/interfaces/catalog";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;
export const dynamicParams = false;

async function getCatalog(params: Promise<{ locale: string }>) {
  const { locale } = await params;

  const data = await fetchApi<Catalog[]>({
    endpoint: "categories",
    query: {
      "populate[image][fields][0]": "url",
      "fields[0]": "slug",
      "fields[1]": "name",
      "fields[2]": "description",
      "fields[3]": "locale",
    },
    locale: locale,
    wrappedByKey: "data",
  });

  return { data, locale };
}

export default async function CatalogPage({ params }: Props) {
  const { data, locale } = await getCatalog(params);

  return (
    <section>
      <Container>
        <h1 className="text-4xl font-bold pb-10 text-center">
          Catalog Page
          <br />
          <span className="text-yellow-500"> Locale: {locale}</span>
        </h1>
        <ul className="grid grid-cols-3 gap-10">
          {data.map((catalog) => (
            <li key={catalog.id}>
              <Link
                className="block p-4 bg-gray-100 rounded-2xl transition duration-300 ease-in-out
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
