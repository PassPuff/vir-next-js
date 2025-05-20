"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ComponentProps } from "react";

export default function LinkNav({
  href,
  children,
  className,
  onClick,
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        isActive
          ? "text-yellow-500 hover:text-yellow-500 focus:text-yellow-500 "
          : "hover:text-yellow-500  focus:text-yellow-500 transition duration-300 ease-in-out",
        className,
        onClick,
      )}
    >
      {children}
    </Link>
  );
}
