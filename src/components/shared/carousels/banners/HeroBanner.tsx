import Image from "next/image";
import Container from "@/components/shared/Container";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/shared/carousels/CarouselDots";
import { cn } from "@/lib/utils";

import type { HeroBanner } from "@/interfaces/main";
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link'


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
						<CarouselItem key={item.id} className="relative h-[88dvh]" >
							<div className="absolute -z-10 top-0 bottom-0 brightness-50 w-full">
								{item.video ? (
									<video
										width={1920}
										height={720}
										className="object-cover min-h-full"
										autoPlay
										loop
										muted
										playsInline
										src={item.video.url}
										poster={item.image.url}
									/>
								)
									: (
										<Image
											src={item.image.url}
											alt={item.image.alternativeText + " "}
											width={1920}
											height={720}
											className="object-cover min-h-full"
										/>
									)
								}
							</div>
							<Container className="flex flex-col justify-center min-h-full text-white max-w">
								<div className="max-w-[700px]">
									<h2 className="text-6xl font-bold mb-8" dangerouslySetInnerHTML={{ __html: item.title }} />
									<p className="text-3xl mb-8">{item.description}</p>
									<Link href={item.link.href} className={cn(buttonVariants({ variant: "link", size: "lg" }), "bg-white")}>
										{item.link.label}
									</Link>
								</div>
							</Container>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselDots className="absolute bottom-4 left-0 right-0" />
			</Carousel>
		</section >
	);
}
