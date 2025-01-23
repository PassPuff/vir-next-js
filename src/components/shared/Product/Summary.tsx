import Container from "@/components/shared/Container";
import Image from "next/image";
import type Product from "@/interfaces/product";

export default function Summary({ products }: { products: Product }) {
  return (
    <section>
      <Container className="relative grid grid-cols-12 auto-rows-auto grid-flow-col dense gap-x-2.5">
        <h1 className=" col-span-6 max-w-2xl text-4xl font-bold">
          {products.name}
        </h1>
        <div className="col-span-6 grid-row-span-2  text-lg">
          <p className="mb-5">{products.description}</p>
          <p className="font-bold text-3xl">
            {products.orderPrice ? products.orderPrice : products.stockPrice}
            &euro;
          </p>
        </div>

        {products.imageMain && (
          <Image
            className="col-span-6 row-span-2"
            src={process.env.STRAPI_API_URL + products.imageMain.url}
            alt={products.name}
            width={500}
            height={500}
          />
        )}
      </Container>
    </section>
  );
}
