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
import { CarouselDots } from "@/components/shared/carousels/CarouselDots";

export default async function HeroBanner({
	homeBanner,
}: {
	homeBanner: HeroBanner[];
}) {
	return (
		<section>
			<Carousel>
				<CarouselContent>
					{homeBanner.map((item) => (
						<CarouselItem key={item.id} className="relative h-[78dvh]">
							<div className="absolute inset -z-10 top-0 bottom-0">
								<Image
									src={item.image.url}
									alt={item.image.alternativeText + " "}
									width={1920}
									height={720}
									className="object-cover min-h-full"
								/>
							</div>
							<Container className="flex flex-col justify-center min-h-full text-white">
								<h2 className="text-3xl font-bold">{item.title}</h2>
								<p className="text-xl">{item.description}</p>
							</Container>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselNext className="right-5" />
				<CarouselPrevious className="left-5" /> */}
				<CarouselDots className="absolute bottom-4 left-0 right-0" />
			</Carousel>
		</section>
	);
}
