import Container from "@/components/shared/Container";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import type { SectionChoiceProps } from "@/types/blocks";

export default function ChoiceMain({ title, text, image }: SectionChoiceProps) {
	return (
		<section className='py-20'>
			<Container>
				<h2 className='text-7xl mb-10' dangerouslySetInnerHTML={{ __html: title }} />
			</Container>
			<div className="grid grid-cols-12 gap-7 items-center">
				<Image
					className="col-start-1 col-end-7 object-cover"
					src={image?.url || "/default-image.jpg"}
					alt={image?.alternativeText + " test"}
					width={890}
					height={430}
				/>
				<div className="col-start-7 col-end-11 text-xl">
					<BlocksRenderer content={text || []} />
				</div>
			</div>
		</section>
	);
}
