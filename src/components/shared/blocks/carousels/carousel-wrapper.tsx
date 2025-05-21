"use client";
import { Carousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import AutoScroll from "embla-carousel-auto-scroll";
import { EmblaOptionsType } from "embla-carousel";

export function CarouselWrapper({
  children,
  autoplay = false,
  autoplayDelay = 5000,
  fade = false,
  playOnInit = false,
  options = {},
}: {
  children: React.ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  fade?: boolean;
  playOnInit?: boolean;
  options?: EmblaOptionsType | undefined;
}) {
  const plugins = [];

  if (fade) {
    plugins.push(Fade());
  }
  if (playOnInit) {
    plugins.push(AutoScroll({ playOnInit: true, speed: 1 }));
  }

  if (autoplay) {
    plugins.push(Autoplay({ delay: autoplayDelay }));
  }

  return (
    <Carousel plugins={plugins} opts={options}>
      {children}
    </Carousel>
  );
}
