import type { Block } from "@/types";
import HeroBanner from "@/components/shared/blocks/carousels/banners/hero-banner";
import SectionChoice from "@/components/shared/blocks/section-choice";
import SectionMission from "@/components/shared/blocks/section-mission";
import SectionBenefits from "@/components/shared/blocks/section-benefits";

export function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.section-hero-banner":
      return <HeroBanner {...block} key={index} />;
    case "blocks.section-choice":
      return <SectionChoice {...block} key={index} />;
    case "blocks.section-mission":
      return <SectionMission {...block} key={index} />;
    case "blocks.section-benefits":
      return <SectionBenefits {...block} key={index} />;
    default:
      return null;
  }
}
