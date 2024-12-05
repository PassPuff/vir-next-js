import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main page",
  description: "Generated by create next app",
};

export default async function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
