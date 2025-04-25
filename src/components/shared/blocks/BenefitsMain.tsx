import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import type { SectionBenefitsProps } from "@/types/blocks";
import { cn } from "@/lib/utils";

export default function BenefitsMain({
  title,
  image,
  text,
}: SectionBenefitsProps) {
  return (
    <section>
      <header
        className={cn(
          "relative min-h-[240px] content-center bg-[var(--yellow)]",
          "before:content-[] before:absolute before:z-[2] before:top-0 before:left-0 before:max-w-80 before:h-full before:w-full before:bg-black",
        )}
      >
        <h2
          className={cn(
            "grid grid-cols-12  m-auto max-w-3xl text-7xl  leading-[1]",
            "*:first:col-start-2 *:first:row-1 *:first:col-end-13",
            "*:last:col-start-5 *:last:row-2 *:last:col-end-13 *:last:font-bold",
          )}
          dangerouslySetInnerHTML={{ __html: title || "" }}
        />
      </header>
      <div className="grid grid-cols-12 gap-7">
        <Image
          className="col-span-4 object-cover w-max"
          src={image?.url || "/icon-512.png"}
          alt={image?.alternativeText + " test"}
          width={700}
          height={430}
        />
        <div
          className={cn(
            "col-start-6 col-span-4 text-xl py-20 font-bold",
            "[&_ul]:grid [&_ul]:grid-cols-2 [&_ul]:gap-6 [&_ul]:mt-20",
          )}
        >
          <BlocksRenderer content={text || []} />
        </div>
      </div>
    </section>
  );
}
