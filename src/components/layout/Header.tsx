"use client";

import LinkNav from "@/components/ui/link-nav";
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
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import MobileMenu from "@/components/shared/nav/mobile-menu";
import { CategoryProps } from "@/types";
import { cn } from "@/lib/utils";

type LinkNav = {
  label: string;
  slug: string;
};

const topLinks: LinkNav[] = [
  { label: "Payment and delivery", slug: "#" },
  { label: "About us", slug: "#" },
  { label: "Contacts", slug: "#" },
  { label: "Blog", slug: "#" },
  { label: "Service", slug: "#" },
];

interface HeaderProps {
  categories: CategoryProps[];
}

export default function Header({ categories }: HeaderProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { scrollDirection, scrollY } = useScrollDirection(5);

  const t = useTranslations("Header");

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
                      <LinkNav href={`/${link.slug}`}>{link.label}</LinkNav>
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
          <LinkNav href="/">
            <Image
              src="/logo.svg"
              alt="Virmer Logo"
              className="max-w-[48px]"
              width={50}
              height={50}
            />
          </LinkNav>

          {/* Десктоп каталог */}
          <div className="hidden md:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-6">
                {categories.slice(0, 5).map((link) => (
                  <NavigationMenuItem key={link.documentId}>
                    <NavigationMenuLink asChild>
                      <LinkNav href={`/catalog/${link.slug}`}>
                        {link.name}
                      </LinkNav>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t("more")}</NavigationMenuTrigger>
                  <NavigationMenuContent className="z-1 min-w-max -left-10">
                    {categories.slice(5).map((link) => (
                      <NavigationMenuLink key={link.documentId} asChild>
                        <LinkNav href={`/catalog/${link.slug}`}>
                          {link.name}
                        </LinkNav>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/*Мобайл бургер */}
          {!isDesktop && (
            <MobileMenu categories={categories} topLinks={topLinks} />
          )}
        </Container>
      </div>
    </header>
  );
}
