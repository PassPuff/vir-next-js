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
        <h1 className="font-bold text-4xl pb-10">Catalog Page {locale}</h1>
        <ul className="grid grid-cols-2 gap-5">
          {catalogs.map((catalog) => (
            <li key={catalog.id}>
              <Link
                href={`/${locale}/catalog/${catalog.slug}`}
                key={catalog.slug}
              >
                <h2 className="font-bold pb-3 text-2xl">{catalog.name}</h2>
                <p>{catalog.description}</p>
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
