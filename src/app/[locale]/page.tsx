import { notFound } from "next/navigation";
import { blockRenderer } from "@/lib/block-renderer";
import SectionEquipment from "@/components/shared/blocks/section-equipment";
import type { HomePageProps } from "@/types";
import fetchApi from "@/lib/api/strapi";

type Props = {
  params: Promise<{ locale: string }>;
};

async function fetchMainPageData(locale: string) {
  const data = await fetchApi<HomePageProps>({
    endpoint: "home-page",
    locale,
    wrappedByKey: "data",
    next: {
      revalidate: 60,
      cache: "force-cache",
    },
  });

  if (!data) notFound();

  return data;
}

export default async function MainPage({ params }: Props) {
  const { locale } = await params;
  const data: HomePageProps = await fetchMainPageData(locale);
  if (!data) notFound();

  return (
    <>
      {data?.blocks?.map((block, index: number) => {
        return blockRenderer(block, index);
      })}
      <SectionEquipment locale={locale} />
    </>
  );
}
