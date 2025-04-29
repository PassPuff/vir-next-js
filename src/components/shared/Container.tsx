import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[1310px] px-[25px] md:px-[25px] max-md:px-[20px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
