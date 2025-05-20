import { notFound } from "next/navigation";
import { blockRenderer } from "@/lib/block-renderer";
import SectionEquipment from "@/components/shared/blocks/section-equipment";
import { getHomePage } from "@/lib/api/get-data";
import { SectionMarque } from "@/components/shared/blocks/section-marquee";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MainPage({ params }: Props) {
  const { locale } = await params;
  const data = await getHomePage(locale);

  if (!data) notFound();

  return (
    <>
      {data?.blocks?.map((block, index: number) => {
        return blockRenderer(block, index);
      })}
      <SectionEquipment locale={locale} />
      <SectionMarque />
    </>
  );
}
