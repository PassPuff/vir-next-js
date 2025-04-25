import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/shared/blocks/carousels/CarouselDots";
import { buttonVariants } from "@/components/ui/button";
import WrapperCarousel from "@/components/shared/blocks/carousels/wrapperCarousel";
import { cn } from "@/lib/utils";

import type { HeroBanner } from "@/types/main-page";

export default async function HeroBanner({
  homeBanner,
}: {
  homeBanner: HeroBanner[];
}) {
  return (
    <section>
      <WrapperCarousel autoplay={false} autoplayDelay={5000} fade={true}>
        <CarouselContent>
          {homeBanner.map((item) => (
            <CarouselItem key={item.id} className="relative h-[88dvh]">
              <div className="absolute -z-10 top-0 bottom-0 brightness-50 w-full">
                {item.video ? (
                  <video
                    className="object-cover min-h-full w-full"
                    src={item.video.url}
                    poster={item.image.url}
                    width={1920}
                    height={720}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    className="object-cover min-h-full  w-full"
                    src={item.image.url}
                    alt={item.image.alternativeText + " "}
                    width={1920}
                    height={720}
                  />
                )}
              </div>
              <Container className="flex flex-col justify-center min-h-full text-white max-w">
                <div className="max-w-[700px]">
                  <h2
                    className="text-6xl font-bold mb-8"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <p className="text-3xl mb-18">{item.description}</p>
                  <Link
                    href={item.link.href}
                    className={cn(
                      buttonVariants({ variant: "clearIce" }),
                      "bg-white/40 px-8 py-3 text-2xl hover:text-[var(--yellow)] backdrop-blur-xs",
                    )}
                  >
                    {item.link.label}
                  </Link>
                </div>
              </Container>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="absolute bottom-4 left-0 right-0" />
      </WrapperCarousel>
    </section>
  );
}
