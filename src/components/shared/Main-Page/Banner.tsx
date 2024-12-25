import Image from "next/image";
import type Main from "@/interfaces/main";
import Container from "@/components/shared/Container";
import { getTranslations } from "next-intl/server";

export default async function Banner({ homeBanner }: { homeBanner: Main }) {
  const urlBg = process.env.STRAPI_API_URL + homeBanner.image.url;
  const t = await getTranslations("HomePage");

  return (
    <section className="relative w-full h-auto">
      <Image
        src={urlBg}
        alt={homeBanner.title}
        width={400}
        height={300}
        className="w-full h-auto object-cover"
      />
      <Container className="absolute inset-0 flex justify-center flex-col text-white">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mb-10">{homeBanner.title}</h1>
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <p className="text-lg">{homeBanner.description}</p>
        </div>
      </Container>
    </section>
  );
}
