/**
 * SSR Integration עם next-intl
 * משלב את מערכת התרגומים עם getMessages()
 */

import { getMessages, getLocale } from "next-intl/server";
import { loadUITranslations, loadDataTranslations } from "./loaders";
import type { Locale, EntityType } from "./types";

/**
 * טוען תרגומים ב-SSR עם next-intl
 */
export async function getServerTranslations(
  entityTypes: EntityType[] = ["teams", "leagues"]
) {
  try {
    const locale = (await getLocale()) as Locale;
    const messages = await getMessages();

    // טוען תרגומי Data entities
    const dataTranslations = await Promise.all(
      entityTypes.map(async (type) => ({
        type,
        translations: await loadDataTranslations(type, locale),
      }))
    );

    return {
      locale,
      messages,
      data: dataTranslations.reduce((acc, { type, translations }) => {
        acc[type] = translations;
        return acc;
      }, {} as Record<EntityType, Record<string, string>>),
    };
  } catch (error) {
    console.error("Failed to load server translations:", error);
    return {
      locale: "en" as Locale,
      messages: {},
      data: {} as Record<EntityType, Record<string, string>>,
    };
  }
}

/**
 * יוצר context לתרגומים ב-SSR
 */
export async function createTranslationContext() {
  const { locale, messages, data } = await getServerTranslations();

  return {
    locale,
    messages,
    data,
    // פונקציות עזר
    getTeamName: (slug: string, fallback?: string) =>
      data.teams?.[slug] || fallback || slug,
    getLeagueName: (slug: string, fallback?: string) =>
      data.leagues?.[slug] || fallback || slug,
    getCountryName: (slug: string, fallback?: string) =>
      data.countries?.[slug] || fallback || slug,
  };
}

/**
 * Hook ל-SSR translations
 */
export function useServerTranslations() {
  // זה יעבוד רק ב-SSR context
  return {
    getTeamName: (slug: string, fallback?: string) => {
      // ב-SSR זה יהיה זמין מה-context
      return fallback || slug;
    },
    getLeagueName: (slug: string, fallback?: string) => {
      return fallback || slug;
    },
  };
}
