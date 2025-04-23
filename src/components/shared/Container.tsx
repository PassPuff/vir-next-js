import { cn } from "@/lib/utils";

interface ContainerProps {
	className?: string;
	children: React.ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
	return (
		<div className={cn("mx-auto max-w-[1280px] max-md:p-6", className)}>
			{children}
		</div>
	);
}
