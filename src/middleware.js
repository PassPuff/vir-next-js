import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  defaultLocale: "en",
  locales: ["en", "it", "fr"],
  localeDetection: false,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
