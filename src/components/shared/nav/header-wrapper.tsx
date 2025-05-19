"use client";

import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

export default function HeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollDirection, scrollY } = useScrollDirection(5);

  return (
    <header
      className={cn(
        "w-full shadow-md fixed z-40 transition-transform duration-300",
        scrollY < 80
          ? "translate-y-0" // показать на первом экране
          : scrollDirection === "down"
            ? "-translate-y-full"
            : "translate-y-0",
      )}
    >
      {children}
    </header>
  );
}
