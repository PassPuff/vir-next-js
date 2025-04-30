"use client";

import NavLink from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ShoppingCart } from "lucide-react";
import Container from "@/components/shared/Container";

import { useMediaQuery } from "@/hooks/use-media-query";
import MobileMenu from "@/components/shared/nav/MobileMenu";

type NavLink = {
  label: string;
  href: string;
};

const catalogLinks: NavLink[] = [
  { label: "Laser CO2", href: "#" },
  { label: "Markers", href: "#" },
  { label: "Metal cutting", href: "#" },
  { label: "CNC Router", href: "#" },
  { label: "Welding", href: "#" },
  { label: "Cleaning", href: "#" },
  { label: "Press Brakes", href: "#" },
  { label: "Tube Cutters", href: "#" },
];

const topLinks: NavLink[] = [
  { label: "Payment and delivery", href: "#" },
  { label: "About us", href: "#" },
  { label: "Contacts", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Service", href: "#" },
];

export default function Navbar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
                      <NavLink href={link.href}>{link.label}</NavLink>
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
          <NavLink href="/">
            <Image
              src="/logo.svg"
              alt="Virmer Logo"
              className="max-w-[48px]"
              width={50}
              height={50}
            />
          </NavLink>

          {/* Десктоп каталог */}
          <div className="hidden md:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-6">
                {catalogLinks.slice(0, 5).map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink asChild>
                      <NavLink href={link.href}>{link.label}</NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>More</NavigationMenuTrigger>
                  <NavigationMenuContent className="z-1 min-w-max">
                    {catalogLinks.slice(5).map((link) => (
                      <NavigationMenuLink key={link.label} asChild>
                        <NavLink href={link.href}>{link.label}</NavLink>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/*Мобайл бургер */}
          {!isDesktop && (
            <MobileMenu catalogLinks={catalogLinks} topLinks={topLinks} />
          )}
        </Container>
      </div>
    </header>
  );
}
