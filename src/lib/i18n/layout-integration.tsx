/**
 * דוגמה לאינטגרציה עם layout.tsx
 * כולל Prefetch חכם ו-SSR
 */

import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { prefetchTranslations, createTranslationContext } from "./ssr";

interface TranslationProviderProps {
  children: ReactNode;
  locale: string;
}

/**
 * Provider מותאם לתרגומים עם Prefetch
 */
export async function TranslationProvider({ 
  children, 
  locale 
}: TranslationProviderProps) {
  // טוען UI messages (סטנדרטי)
  const messages = await getMessages();
  
  // Prefetch חכם - טוען Data entities מראש
  await prefetchTranslations(locale as any, ["teams", "leagues"]);
  
  // יוצר context לתרגומים
  const translationContext = await createTranslationContext();

  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={messages}
      // נוכל להוסיף כאן context נוסף לתרגומים
    >
      {children}
    </NextIntlClientProvider>
  );
}

/**
 * Hook לשימוש ב-layout
 */
export async function setupTranslations(locale: string) {
  try {
    // Prefetch כל התרגומים הנדרשים
    await prefetchTranslations(locale as any, [
      "teams", 
      "leagues", 
      "countries"
    ]);
    
    console.log(`[Layout] Prefetched translations for ${locale}`);
    
    return {
      success: true,
      locale,
      prefetched: ["teams", "leagues", "countries"],
    };
  } catch (error) {
    console.error(`[Layout] Failed to prefetch translations for ${locale}:`, error);
    return {
      success: false,
      locale,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * דוגמה לשימוש ב-layout.tsx
 */
export function exampleLayoutUsage() {
  return `
// layout.tsx
import { TranslationProvider, setupTranslations } from "@/lib/i18n/layout-integration";

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Setup translations
  await setupTranslations(locale);
  
  return (
    <html lang={locale}>
      <body>
        <TranslationProvider locale={locale}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
`;
}

