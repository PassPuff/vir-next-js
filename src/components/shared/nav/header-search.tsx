"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import { getSearchProducts } from "@/lib/api/get-data";
import { Input } from "@/components/ui/input";
import SearchResult from "@/components/shared/nav/search-result";
import { ProductsProps } from "@/types";

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
        <div className="fixed h-[120vh] top-0 left-0 right-0 bg-black/50 z-30" />
      )}
      <div ref={ref} className="relative z-30">
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
          <SearchResult data={data} focused={focused} />
        )}
      </div>
    </>
  );
}
