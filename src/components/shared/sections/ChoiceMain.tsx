import Container from "@/components/shared/Container";
// import {
//   BlocksRenderer,
//   type BlocksContent,
// } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import type { SectionChoiceProps } from "@/types/blocks";

export default function ChoiceMain({
  title,
  text,
  image,
}: Readnly<SectionChoiceProps>) {
  return (
    <section>
      <Container>
        <h2>{title}</h2>
      </Container>
      <div className="grid-cols-12">
        <Image
          src={"/choice-main.jpg"}
          alt={"How to find the right CNC Machine for Your Business?"}
          width={890}
          height={430}
          className="col-start-1 col-end-6"
        />
        {/*<BlocksRenderer content={content} />*/}
      </div>
    </section>
  );
}
