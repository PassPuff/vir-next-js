import { getCategories } from "@/lib/api/get-categories";
import Container from "@/components/shared/Container";
import NavLink from "@/components/shared/MainBanner/NavLink";
import ButtonToggleTheme from "@/components/ui/ButtonToggleTheme/ButtonToggleTheme";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher/LanfuageSwitcher";
type Props = {
  locale: string;
};

export default async function Header({ locale }: Props) {
  const categories = await getCategories(locale);

  return (
    <header className="bg-gray-200 dark:bg-gray-800 py-5 mb-4">
      <Container className="flex justify-between items-center">
        <LanguageSwitcher />
        <nav>
          <ul className="flex gap-5 list-none text-2xl *:px-0.5 *:py-1">
            <NavLink path={`/${locale}`}>Main</NavLink>
            <NavLink path={`/${locale}/catalog`}>Catalog</NavLink>
            {categories.map((category) => (
              <NavLink
                key={category.documentId}
                path={`/${locale}/catalog/${category.slug}`}
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
