"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { clsx } from "clsx";

export default function NavigationLink({
  href,
  children,
  // className,
  ...rest
}: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      href={href}
      className={clsx(
        isActive
          ? "text-yellow-500 "
          : "hover:text-yellow-500   focus:text-yellow-500 transition duration-300 ease-in-out",
        // className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
