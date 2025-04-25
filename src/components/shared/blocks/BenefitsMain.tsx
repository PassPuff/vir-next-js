import Container from "@/components/shared/Container";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import type { SectionBenefitsProps } from "@/types/blocks";

export default function BenefitsMain({
  title,
  image,
  text,
}: SectionBenefitsProps) {
  return (
    <section className="py-20">
      <Container className="text-center">
        <h2
          className="text-8xl mb-10"
          dangerouslySetInnerHTML={{ __html: title || [] }}
        />
      </Container>

      <div className="grid grid-cols-12  grid-rows-subgrid gap-7">
        <Image
          className="col-span-5 row-1 object-cover -mb-60 z-10 w-max"
          src={image?.url || "/default-image.jpg"}
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
