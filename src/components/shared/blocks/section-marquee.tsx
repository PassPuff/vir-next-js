import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselWrapper } from "@/components/shared/blocks/carousels/carousel-wrapper";

export const SectionMarque = () => {
  return (
    <section className="py-20 lg:py-40">
      <h2 className="sr-only">Partners</h2>
      <div className="relative">
        <div className="absolute left-0 top-0 right-0 bottom-0 z-10 w-full h-full bg-gradient-to-r from-background via-white/0 to-background " />
        <CarouselWrapper playOnInit={true} options={{ loop: true }}>
          <CarouselContent>
            {Array.from({ length: 7 }).map((_, index) => (
              <CarouselItem className="basis-1/4 lg:basis-1/6" key={index}>
                <div className="flex rounded-md aspect-square bg-muted items-center justify-center p-2 ">
                  <span className="text-sm">Logo {index + 1}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselWrapper>
      </div>
    </section>
  );
};
