import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import fetchApi from "@/lib/api/strapi";
import { CategoryProps } from "@/types";
import PopUpForms from "@/components/shared/forms/PopUpForms";

export const metadata: Metadata = {
  title:
    "Virmer is the supplier of CNC machines laser and router equipment at prices from the manufacturer",
  description:
    "We supply CNC machines, laser and router equipment with a manufacturer's warranty ⭐ WATTSAN ⭐. Service and delivery In the Netherlands and throughout Europe",
  icons: {
    icon: ["/favicon.ico?v=0.1"],
    apple: ["/apple-touch-icon.png?v=0.1"],
    shortcut: ["/apple-touch-icon.png?v=0.1"],
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; category: string }>;
};

const myFont = localFont({ src: "../../fonts/Pangram-Light.woff2" });

export async function generateStaticParams(): Promise<
  { locale: string; category: string }[]
> {
  const locales = routing.locales;

  const params = await Promise.all(
    locales.map(async (locale) => {
      const categories = await fetchApi<CategoryProps[]>({
        endpoint: "categories",
        locale,
        wrappedByKey: "data",
      });

      return categories.map((category) => ({
        locale,
        category: category.slug,
      }));
    }),
  );

  return params.flat();
}

export default async function MainLayout({ params, children }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const data = await fetchApi<CategoryProps[]>({
    endpoint: "categories",
    locale,
    wrappedByKey: "data",
    next: {
      revalidate: 60,
      cache: "force-cache",
    },
  });

  if (!data) notFound();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div>
            <Header categories={data} />
            <main className={cn(myFont.className, "antialiased, pt-[12.5dvh]")}>
              <PopUpForms />
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
