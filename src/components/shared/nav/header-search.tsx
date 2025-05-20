"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import { getSearchProducts } from "@/lib/api/get-data";
import { Input } from "@/components/ui/input";
import { ProductsProps } from "@/types";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export function HeaderSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const [term, setTerm] = useState(searchParams.get("query") || "");
  const [data, setData] = useState<ProductsProps[]>([]);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  // fetch data каждый раз, когда меняется term
  useDebounce(
    () => {
      async function fetchProducts() {
        if (!term) {
          setData([]);
          return;
        }
        const data = await getSearchProducts(term);
        setData(data);
      }

      fetchProducts();
    },
    300,
    [term],
  );

  return (
    <>
      {focused && (
        <div className="fixed h-[120vh] top-0 left-0 right-0 bg-black/50 z-30 overscroll-none" />
      )}
      <div ref={ref} className="relative z-30 flex-1">
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <Input
          className="pl-10 z-30"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            router.replace(`?query=${encodeURIComponent(e.target.value)}`);
          }}
          onFocus={() => setFocused(true)}
          placeholder="Search"
        />
        {term && data.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12",
            )}
          >
            {data.map((item) => (
              <Link
                className="flex items-center gap-2 text-black px-3 py12 hover:bg-primary/10 cursor-pointer"
                key={item.documentId}
                href={`/catalog/${item.category?.slug}/${item.slug}`}
                //закрыть поиск при клике
                onClick={() => {
                  setTerm("");
                  setFocused(false);
                }}
              >
                <Image
                  src={item.image?.url || "/icon-512.png"}
                  width={50}
                  height={50}
                  alt={item.name}
                />
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
