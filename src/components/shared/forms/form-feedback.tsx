import { FormBasic } from "@/components/shared/forms/form-basic";
import Container from "@/components/shared/Container";
import { cn } from "@/lib/utils";

export default function FormFeedback() {
  return (
    <section
      className={cn(
        "py-10 lg:py-20 bg-cover bg-no-repeat bg-center",
        "bg-[url('https://res.cloudinary.com/dsiqgbrsj/image/upload/v1747810993/feedback_newbg_16cd94b407.jpg')]",
      )}
    >
      <Container>
        <div className={"max-w-md  ml-auto bg-black text-white"}>
          <header className="text-center">
            <h2 className="text-4xl mb-8">Get an expert consultation</h2>
            <ul
              className={cn(
                "flex flex-wrap justify-center gap-x-4 text-sm mb-8",
                "*:even:list-disc *:even:list-inside *:even:marker:text-primary",
              )}
            >
              <li>Warranty up to 5 years</li>
              <li>Local service all over the Europe</li>
              <li>Showroom and Demo</li>
              <li>Delivery guarantee</li>
            </ul>
          </header>
          <FormBasic />
        </div>
      </Container>
    </section>
  );
}
