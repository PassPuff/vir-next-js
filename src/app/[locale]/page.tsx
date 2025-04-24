import HeroBanner from "@/components/shared/carousels/banners/HeroBanner";
import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/fetch-api";
import { blockRenderer } from "@/lib/block-renderer";

import type { Data } from "@/types/main-page";
import type { Block } from "@/types/blocks";

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

  const blocks = data.blocks;

  return (
    <>
      <HeroBanner homeBanner={data.heroBanner} />
      {blocks.map((block: Block, index: number) => {
        return blockRenderer(block, index);
      })}
    </>
  );
}
