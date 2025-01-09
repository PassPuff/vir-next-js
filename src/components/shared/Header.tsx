import Container from "@/components/shared/Container";
import NavLink from "@/components/shared/NavLink";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import ButtonToggleTheme from "@/components/shared/ButtonToggleTheme";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { fetchAPI } from "@/lib/fetch-api";
import { notFound } from "next/navigation";
import type Catalog from "@/interfaces/catalog";
import qs from "qs";

type Props = {
  locale: string;
};

const createQueryCatalog = (locale: string) =>
  qs.stringify({
    locale: locale,
    fields: ["slug", "locale", "name"],
  });

export async function getCategoriesMenu(locale: string) {
  const query = createQueryCatalog(locale);
  const categories = await fetchAPI(`/api/categories?${query}`, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (!categories) notFound();

  return categories.data;
}

export default async function Header({ locale }: Props) {
  const categories: Catalog[] = await getCategoriesMenu(locale);

  return (
    <header className="dark:bg-gray-800 shadow-xl  py-5 mb-10">
      <Container className="flex items-center gap-14">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </Link>
        <LanguageSwitcher />
        <nav>
          <ul className="flex gap-5 list-none text-2xl *:px-0.5 *:py-1">
            <NavLink path={`/catalog`}>Catalog</NavLink>
            {categories.map((category) => (
              <NavLink
                key={category.documentId}
                path={`/catalog/${category.slug}`}
              >
                {category.name}
              </NavLink>
            ))}
          </ul>
        </nav>
        <ButtonToggleTheme />
      </Container>
    </header>
  );
}
