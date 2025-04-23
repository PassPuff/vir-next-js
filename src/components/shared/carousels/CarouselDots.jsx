"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export const CarouselDots = React.forwardRef(({ className, ...props }, ref) => {
	const { api } = useCarousel();

	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [numberOfSlides, setNumberOfSlides] = React.useState(0);

	React.useEffect(() => {
		if (!api) return;

		const update = () => {
			setCurrentSlide(api.selectedScrollSnap());
			setNumberOfSlides(api.scrollSnapList().length);
		};

		update(); // инициализируем значения при монтировании

		api.on("select", update);
		api.on("reInit", update);

		return () => {
			api.off("select", update);
			api.off("reInit", update);
		};
	}, [api]);

	if (numberOfSlides <= 1) return null;

	return (
		<div
			ref={ref}
			className={cn("flex justify-center", className)}
			{...props}
		>
			<div className="inline-flex items-center rounded-full p-1">
				{Array.from({ length: numberOfSlides }, (_, i) => (
					<Button
						key={i}
						className={cn(
							"mx-2 h-3 w-3 rounded-full p-0",
							i === currentSlide
								? "bg-transparent ring-2 ring-[var(--yellow)]"
								: "bg-[var(--gray)]"
						)}
						aria-label={`Go to slide ${i + 1}`}
						onClick={() => api?.scrollTo(i)}
					/>
				))}
			</div>
		</div>
	);
});
CarouselDots.displayName = "CarouselDots";
