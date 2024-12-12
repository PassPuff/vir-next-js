import MainBanner from "@/components/shared/MainPage/MainBanner";
import { getHomeInfo } from "@/lib/api/get-home-info";
import type Main from "@/interfaces/main";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const homeBanner: Main = await getHomeInfo(locale);

  return (
    <>
      <MainBanner homeBanner={homeBanner} />
    </>
  );
}
