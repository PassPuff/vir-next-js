import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { getMessages } from "next-intl/server";
import { fetchAPI } from "@/lib/fetch-api";
import type { Locales } from "@/interfaces/locales";
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

export async function generateStaticParams(): Promise<{ locale: string }[]> {
	const data: Locales[] = await fetchAPI(`/api/i18n/locales`, {
		method: "GET",
		next: { revalidate: 60 },
	});

	if (!data) notFound();

	return data.map((locale) => ({
		locale: locale.code,
	}));
}

export default async function MainLayout({ params, children }: Props) {
	const { locale } = await params;

	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages}>
					<div>

						{/*<Header locale={locale} />*/}
						<main className={cn(myFont.className, "antialiased")}>
							{children}
						</main>
						<h1>{locale}</h1>

					</div>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
