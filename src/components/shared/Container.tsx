import clsx from "clsx";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={clsx("mx-auto max-w-[1280px]", className)}>{children}</div>
  );
}
