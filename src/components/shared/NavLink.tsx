"use client";
// import Link from "next/link";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";

type Props = {
  path: string;
  children: React.ReactNode;
};

export default function NavLink({ path, children }: Props) {
  const pathName = usePathname();
  const active = pathName === path;

  return (
    <li>
      <Link
        className={
          active
            ? "text-yellow-500"
            : "hover:text-yellow-500  transition duration-300 ease-in-out focus:text-yellow-500"
        }
        href={path}
      >
        {children}
      </Link>
    </li>
  );
}
