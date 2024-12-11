import { getCategories } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params;

  const catalogs = await getCategories(locale);

  return (
    <section>
      <Container>
        <h1 className="text-4xl font-bold pb-10 text-center">
          Catalog Page
          <br />
          <span className="text-yellow-500"> Locale: {locale}</span>
        </h1>
        <ul className="grid grid-cols-3 gap-10">
          {catalogs.map((catalog) => (
            <li key={catalog.id}>
              <Link
                className="block p-4 bg-gray-100 rounded-2xl transition duration-300 ease-in-out
                hover:bg-gray-200
                focus:bg-gray-200"
                href={`/${locale}/catalog/${catalog.slug}`}
                key={catalog.slug}
              >
                <h2 className="font-bold pb-3 text-2xl">{catalog.name}</h2>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_API_URL + catalog.image.url
                  }
                  alt={catalog.name}
                  width={500}
                  height={500}
                ></Image>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
