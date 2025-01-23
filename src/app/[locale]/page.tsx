import Banner from "@/components/shared/Main-Page/Banner";
import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/fetch-api";
import qs from "qs";

export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string }>;
};

// const createQueryBanner = (locale: string) =>
//   qs.stringify(
//     {
//       locale: locale,
//       populate: {
//         blocks: {
//           on: {
//             "banner.main-banner": {
//               populate: {
//                 slider: {
//                   populate: {
//                     description: {
//                       fields: ["text"],
//                     },
//                     media: {
//                       populate: {
//                         videoWebm: {
//                           fields: ["url"],
//                         },
//                         videoMp4: {
//                           fields: ["url"],
//                         },
//                         cover: {
//                           fields: ["url", "alternativeText"],
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     { encodeValuesOnly: true },
//   );

// async function fetchBannerData(locale: string) {
//   const query = createQueryBanner(locale);

//   const data = await fetchAPI(`/api/home-page?${query}`, {
//     method: "GET",
//     next: { revalidate: 60 },
//   });

//   if (!data) notFound();

//   return data?.data || null;
// }

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
  const query = createQueryHome(locale);

  const data = await fetchAPI(`/api/home-page?${query}`, {
    method: "GET",
    next: { revalidate: 60 },
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

  // const banner = await fetchBannerData(locale);
  // if (!banner) notFound();
  // console.log(banner);

  return (
    <>
      <Banner homeBanner={homeBanner} />
    </>
  );
}
