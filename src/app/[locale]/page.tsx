import MainBanner from "@/components/shared/MainBanner/MainBanner";
import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/fetch-api";
import qs from "qs";

export const revalidate = 60;
export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string }>;
};
// Общая функция для создания запроса
const createQueryHome = (locale: string) =>
  qs.stringify({
    locale: locale,
    fields: ["title", "description", "locale"],
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });

// Функция для получения главной страницы
async function fetchMainPageData(locale: string) {
  const authToken = process.env.STRAPI_READ_TOKEN;
  const BASE_URL = process.env.STRAPI_API_URL;
  const path = "/api/main";
  const url = new URL(path, BASE_URL);

  url.search = createQueryHome(locale);

  const data = await fetchAPI(url.href, {
    method: "GET",
    authToken: authToken,
  });

  if (!data) notFound();

  // const blocks = data?.data?.blocks || [];
  // return { blocks };

  return data?.data || null;
}

export default async function MainPage({ params }: Props) {
  const { locale } = await params;

  const homeBanner = await fetchMainPageData(locale);

  if (!homeBanner) notFound();

  return (
    <>
      <MainBanner homeBanner={homeBanner} />
    </>
  );
}
