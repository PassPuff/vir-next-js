import Image from "next/image";
import type Main from "@/interfaces/main";
import Container from "../Container";

export default function MainBanner({ homeBanner }: { homeBanner: Main }) {
  return (
    <section>
      <Container>
        <h1>{homeBanner.title}</h1>
        <p>{homeBanner.description}</p>
        <Image
          src={process.env.STRAPI_API_URL + homeBanner.image.url}
          alt={homeBanner.title}
          width={400}
          height={300}
        ></Image>
      </Container>
    </section>
  );
}
