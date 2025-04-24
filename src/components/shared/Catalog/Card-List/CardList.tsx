import type Catalog from "@/types/catalog";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function CardList({ data }: { data: Catalog[] }) {
  return (
    <ul className="grid grid-cols-3 gap-10">
      {data.map((catalog: Catalog) => (
        <li key={catalog.id}>
          <Link
            className="block grayscale p-4 h-full bg-gray-100 rounded-2xl transition duration-300 ease-in-out
                hover:bg-gray-200 hover:grayscale-0
                focus:bg-gray-200 focus:grayscale-0"
            href={`/catalog/${catalog.slug}`}
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
  );
}
