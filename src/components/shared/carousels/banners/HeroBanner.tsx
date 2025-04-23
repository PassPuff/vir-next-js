import Image from "next/image";
import type { HeroBanner } from "@/interfaces/main";
import Container from "@/components/shared/Container";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function HeroBanner({
  homeBanner,
}: {
  homeBanner: HeroBanner[];
}) {
  return (
    <section className="relative w-full h-auto">
      <Carousel>
        <CarouselContent>
          {homeBanner.map((item) => (
            <CarouselItem key={item.id}>
              <Image
                src={item.image.url}
                alt={item.image.alternativeText}
                width={1920}
                height={720}
                className="max-h-[600px] w-full object-cover"
              />
              <Container className="">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="text-lg">{item.description}</p>
              </Container>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="right-3" />
        <CarouselPrevious className="left-3" />
      </Carousel>
    </section>
  );
}
