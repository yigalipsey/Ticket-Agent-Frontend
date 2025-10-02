import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "he"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // Default to Hebrew if locale is not supported
  const validLocale = locales.includes(locale as (typeof locales)[number])
    ? locale
    : "he";

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
