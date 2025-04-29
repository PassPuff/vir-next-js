"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu, ShoppingCart, X } from "lucide-react";
import Container from "@/components/shared/Container";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";

const catalogLinks = [
  { label: "Laser CO2", href: "#" },
  { label: "Markers", href: "#" },
  { label: "Metal cutting", href: "#" },
  { label: "CNC Router", href: "#" },
  { label: "Welding", href: "#" },
  { label: "Cleaning", href: "#" },
  { label: "Press Brakes", href: "#" },
  { label: "Tube Cutters", href: "#" },
];

const topLinks = [
  { label: "Payment and delivery", href: "/test" },
  { label: "About us", href: "/test" },
  { label: "Contacts", href: "/test" },
  { label: "Blog", href: "/test" },
  { label: "Service", href: "/test" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full shadow-md">
      {/*Верхний ряд */}
      <div className="bg-black text-white  py-2 text-sm">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Язык */}
            <div>🇬🇧</div>
            {/* Навигация */}
            <NavigationMenu className="hidden md:flex gap-6">
              <NavigationMenuList>
                {topLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            {/* Телефон и почта */}
            <div className="hidden md:block text-xs text-right">
              <div>+31208082045</div>
              <div>info@virmer.com</div>
            </div>
            {/* Корзина */}
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>0</span>
            </div>
          </div>
        </Container>
      </div>

      {/*Нижний ряд */}
      {/* Логотип + Категории */}
      <div className="bg-white py-4">
        <Container className="flex items-center justify-between">
          {/*Логотип*/}
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Virmer Logo"
              className="w-auto h-auto max-w-12"
              width={50}
              height={50}
            />
          </Link>

          {/* Десктоп каталог */}
          <div className="hidden md:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-6">
                {catalogLinks.slice(0, 5).map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>More</NavigationMenuTrigger>
                  <NavigationMenuContent className="z-1 min-w-max">
                    {catalogLinks.slice(5).map((link) => (
                      <NavigationMenuLink key={link.label} asChild>
                        <Link href={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/*Мобайл бургер */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button>{open ? <X size={32} /> : <Menu size={32} />}</button>
              </SheetTrigger>

              <SheetContent
                aria-describedby={undefined}
                side="left"
                className="w-10/12 p-6"
              >
                <SheetTitle className="sr-only">Main menu</SheetTitle>

                <div className="space-y-6">
                  {/* Каталог оборудования */}

                  <div>
                    <h3 className="font-bold mb-2">Equipment catalog</h3>
                    <div className="flex flex-col gap-2">
                      {catalogLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="text-sm hover:underline"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Навигация */}
                  <div className="flex flex-col gap-2 text-sm">
                    {topLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="font-bold"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link href="#" className="font-bold">
                      Deal – Markers
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </div>
    </header>
  );
}
