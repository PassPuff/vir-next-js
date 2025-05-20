import Container from "@/components/shared/Container";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getCategories } from "@/lib/api/get-data";

export default async function SectionEquipment({ locale }: { locale: string }) {
  const data = await getCategories(locale);

  if (!data) notFound();

  return (
    <section className="py-20">
      <Container>
        <h2 className="text-6xl font-bold mb-8 sr-only">Category list</h2>
        <ul className="grid grid-cols-12 gap-12">
          {data.map((category) => {
            return (
              <li
                key={category.documentId}
                className={cn(
                  "col-span-4 rounded-md max-lg:col-span-6 aspect-square",
                  "",
                )}
              >
                <Link
                  href={`/catalog/${category.slug}`}
                  className={cn(
                    "group block h-full overflow-hidden bg-[var(--gray-light)] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[var(--yellow)]",
                  )}
                >
                  <h3 className="mx-8 mt-8 text-2xl font-bold">
                    {category.name}
                  </h3>
                  <Image
                    className="ml-auto mr-6 mb-2 grayscale transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0"
                    src={category.image?.url || "/icon-512.png"}
                    alt={category.image?.alternativeText + " test"}
                    width={300}
                    height={300}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
