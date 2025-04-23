import HeroBanner from "@/components/shared/carousels/banners/HeroBanner";
import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/fetch-api";
// import qs from "qs";
import type { Data } from "@/interfaces/main";

export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string }>;
};

async function fetchMainPageData(locale: string) {
  const data = await fetchAPI(`/api/home-page?locale=${locale}`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (!data) notFound();

  return data?.data || null;
}

export default async function MainPage({ params }: Props) {
  const { locale } = await params;
  const data: Data = await fetchMainPageData(locale);
  if (!data) notFound();

  return (
    <>
      <HeroBanner homeBanner={data.heroBanner} />
    </>
  );
}
