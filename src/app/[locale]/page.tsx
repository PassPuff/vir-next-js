import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/api/fetch-api";
import { blockRenderer } from "@/lib/block-renderer";
import EquipmentList from "@/components/shared/blocks/EquipmentList";
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
  const data = await fetchMainPageData(locale);
  if (!data) notFound();

  const blocks = data.blocks;

  return (
    <>
      {blocks.map((block: Block, index: number) => {
        return blockRenderer(block, index);
      })}
      <EquipmentList locale={locale} />
    </>
  );
}
