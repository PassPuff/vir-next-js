import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { fetchAPI } from "@/lib/api/fetch-api";
import type { Metadata } from "next";

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
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

const myFont = localFont({ src: "../../fonts/Pangram-Light.woff2" });

export default async function MainLayout({ params, children }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const { data: categories } = await fetchAPI(
    `/api/categories?locale=${locale}`,
    {
      method: "GET",
      next: { revalidate: 60 },
    },
  );

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div>
            <Header categories={categories} />
            <main className={cn(myFont.className, "antialiased")}>
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
