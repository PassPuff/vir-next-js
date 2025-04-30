"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        isActive
          ? "text-yellow-500"
          : "hover:text-yellow-500 transition duration-300 ease-in-out focus:text-yellow-500",
        className,
      )}
    >
      {children}
    </Link>
  );
}
