"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ProductsProps } from "@/types";

export default function SearchResult({
  data,
  focused,
}: {
  data: ProductsProps[];
  focused: boolean;
}) {
  return (
    <ul
      className={cn(
        "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
        focused && "visible opacity-100 top-12",
      )}
    >
      {data.map((item) => (
        <li
          className="text-black px-3 py12 hover:bg-primary/10 cursor-pointer"
          key={item.documentId}
        >
          <Link href={`/${item.slug}`}>
            <Image
              src={item.image?.url || "/icon-512.png"}
              width={50}
              height={50}
              alt={item.name}
            />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
