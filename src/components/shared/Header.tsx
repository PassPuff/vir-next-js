import { getCategories } from "@/lib/api/get-categories";
import Container from "@/components/shared/Container";
import NavLink from "@/components/shared/NavLink";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import ButtonToggleTheme from "@/components/shared/ButtonToggleTheme";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type Props = {
  locale: string;
};

export default async function Header({ locale }: Props) {
  const categories = await getCategories(locale);

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
