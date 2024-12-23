import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/; // Исключить обработку статичных файлов

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const supportedLocales = ["en", "fr", "it"];
  const defaultLocale = "en";

  // Игнорировать статичные файлы и API-запросы
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // Если путь корневой ("/"), добавляем язык по умолчанию
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // Проверяем, содержит ли путь поддерживаемый язык
  const pathnameParts = pathname.split("/");
  const locale = pathnameParts[1]; // Первый сегмент пути

  if (!supportedLocales.includes(locale)) {
    // Если язык не поддерживается, добавляем язык по умолчанию
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  // Если язык по умолчанию и в URL указан "/en", перенаправляем на путь без языка
  if (locale === defaultLocale) {
    return NextResponse.redirect(
      new URL(pathname.replace(`/${defaultLocale}`, ""), request.url),
    );
  }

  return NextResponse.next();
}
