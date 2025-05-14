"use client";
import { Carousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

export function CarouselWrapper({
  children,
  autoplay = false,
  autoplayDelay = 5000,
  fade = false,
}: {
  children: React.ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  fade?: boolean;
}) {
  const plugins = [];

  if (fade) {
    plugins.push(Fade());
  }

  if (autoplay) {
    plugins.push(Autoplay({ delay: autoplayDelay }));
  }

  return <Carousel plugins={plugins}>{children}</Carousel>;
}
