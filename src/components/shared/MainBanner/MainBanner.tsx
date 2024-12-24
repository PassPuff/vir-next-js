import Image from "next/image";
import type Main from "@/interfaces/main";
import Container from "@/components/shared/Container";

export default function MainBanner({ homeBanner }: { homeBanner: Main }) {
  const urlBg = process.env.STRAPI_API_URL + homeBanner.image.url;

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
          <p className="text-lg">{homeBanner.description}</p>
        </div>
      </Container>
    </section>
  );
}
