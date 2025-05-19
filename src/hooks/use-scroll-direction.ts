"use client";
import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        setScrollDirection(direction);
        setScrollY(currentScrollY);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [threshold]);

  return { scrollDirection, scrollY };
}
