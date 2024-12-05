import {getMainPage} from "@/lib/strapi";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'it' } ]
}

export default async function HomePage({params}: {
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  const {title, description} = await getMainPage(locale);

  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}