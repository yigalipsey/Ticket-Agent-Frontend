/**
 * מערכת URL קנוניים עבור SEO
 * מבטיחה שכל דף יהיה נגיש דרך URL יחיד
 */

export function getCanonicalUrl(path: string, locale?: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ticketagent.co.il";

  // הסרת locale מהנתיב אם קיים
  const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, "/");

  // הוספת locale אם נדרש
  const localizedPath =
    locale && locale !== "en" ? `/${locale}${cleanPath}` : cleanPath;

  return `${baseUrl}${localizedPath}`;
}

export function getAlternateUrls(path: string): { [key: string]: string } {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ticketagent.co.il";

  // הסרת locale קיים מהנתיב
  const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, "/");

  return {
    en: `${baseUrl}${cleanPath}`,
    he: `${baseUrl}/he${cleanPath}`,
  };
}

export function getHreflangUrls(path: string): Array<{
  rel: "alternate";
  hrefLang: string;
  href: string;
}> {
  const alternates = getAlternateUrls(path);

  return Object.entries(alternates).map(([lang, url]) => ({
    rel: "alternate" as const,
    hrefLang: lang === "en" ? "en" : "he",
    href: url,
  }));
}
