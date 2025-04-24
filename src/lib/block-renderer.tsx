import type { Block } from "@/types";
import ChoiceMain from "@/components/shared/sections/ChoiceMain";
import MisionMain from "@/components/shared/sections/MisionMain";

export function blockRenderer(block: Block, index: number) {
	switch (block.__component) {
		case "blocks.section-choice":
			return <ChoiceMain {...block} key={index} />;
		case "blocks.section-mission":
			return <MisionMain {...block} key={index} />;
		default:
			return null;
	}
}
