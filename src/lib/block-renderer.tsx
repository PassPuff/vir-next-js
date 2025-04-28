import type { Block } from "@/types";
import HeroBanner from "@/components/shared/blocks/carousels/banners/HeroBanner";
import ChoiceMain from "@/components/shared/blocks/ChoiceMain";
import MissionMain from "@/components/shared/blocks/MissionMain";
import BenefitsMain from "@/components/shared/blocks/BenefitsMain";

export function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.section-hero-banner":
      return <HeroBanner {...block} key={index} />;
    case "blocks.section-choice":
      return <ChoiceMain {...block} key={index} />;
    case "blocks.section-mission":
      return <MissionMain {...block} key={index} />;
    case "blocks.section-benefits":
      return <BenefitsMain {...block} key={index} />;
    default:
      return null;
  }
}
