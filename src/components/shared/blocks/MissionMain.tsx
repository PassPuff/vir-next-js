import Container from "@/components/shared/Container";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import type { SectionMissionProps } from "@/types/blocks";
import { cn } from "@/lib/utils";

export default function MissionMain({
  subHeading,
  heading,
  image,
  text,
}: SectionMissionProps) {
  return (
    <section className="py-20 bg-[var(--gray-light)] ">
      <Container className="py-10">
        <header
          data-heding={subHeading}
          className={cn(
            "relative text-center",
            "before:content-[attr(data-heding)] before:absolute before:left-0 before:bottom-0 before:z-[2] before:text-[250px] before:font-bold before:leading-[0.6] before:text-[#fffef8] before:blur-xs",
          )}
        >
          <p className="relative z-3 text-4xl">{subHeading}</p>
          <h2
            className="relative z-3 text-8xl mb-10"
            dangerouslySetInnerHTML={{ __html: heading || [] }}
          />
        </header>
      </Container>

      <div className="grid grid-cols-12  grid-rows-subgrid gap-7">
        <Image
          className="col-span-5 row-1 object-cover -mb-90 z-10 w-full"
          src={image?.url || "/icon-512.png"}
          alt={image?.alternativeText + " test"}
          width={700}
          height={430}
        />
        <div className="col-span-8 col-end-13 row-2 text-xl px-60 py-20 bg-black text-white font-bold">
          <BlocksRenderer content={text || []} />
        </div>
      </div>
    </section>
  );
}
