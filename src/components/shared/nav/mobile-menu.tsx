"use client";

import Image from "next/image";
import { X, MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LinkNav from "@/components/ui/link-nav";
import { CategoryProps } from "@/types";
import { useState } from "react";
import { Link } from "@/i18n/routing";

interface MobileMenuProps {
  categories: CategoryProps[];
  topLinks: { label: string; slug: string }[];
}

export default function MobileMenu({ categories, topLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger aria-label="Open main menu">
          <DrawerTitle className="sr-only">Main menu</DrawerTitle>
          <MenuIcon />
        </DrawerTrigger>

        <DrawerContent aria-describedby={undefined}>
          <DrawerHeader className="flex-row justify-between items-end">
            <Image
              src="/logo.svg"
              alt="Virmer Logo"
              className="max-w-[50px]"
              width={50}
              height={50}
            />
            <DrawerClose asChild>
              <X size={32} />
            </DrawerClose>
          </DrawerHeader>

          <NavigationMenu
            orientation="vertical"
            className="justify-start items-start overflow-y-auto min-w-full"
          >
            <NavigationMenuList className="flex-col items-start px-5 gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    className="font-bold"
                    href="/catalog"
                    onClick={() => setIsOpen(false)}
                  >
                    Equipment catalog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {categories.map((link) => (
                <NavigationMenuItem
                  key={link.documentId}
                  className="list-disc ml-6"
                >
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/catalog/${link.slug}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {topLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      className="p-1"
                      href={`/${link.slug}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
