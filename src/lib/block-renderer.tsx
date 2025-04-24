import type { Block } from "@/types";
import ChoiceMain from "@/components/shared/sections/ChoiceMain";

export function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.section-choice":
      return <ChoiceMain {...block} key={index} />;
    default:
      return null;
  }
}
