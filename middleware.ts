import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "he"],

  // Used when no locale matches
  defaultLocale: "he",

  // Always show the locale in the URL
  localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(he|en)/:path*"],
};
