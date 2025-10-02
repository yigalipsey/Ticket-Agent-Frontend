"use client";

import { useTranslations } from "next-intl";

/**
 * Hook פשוט לתרגום שמות קבוצות
 * משתמש ב-next-intl עם fallback
 */
export function useTeamTranslation() {
  const t = useTranslations("teams");

  const getTeamName = (slug: string, fallback?: string): string => {
    try {
      return t(slug);
    } catch (error) {
      return fallback || slug;
    }
  };

  const getTeamNameSafe = (slug: string, fallback?: string): string => {
    try {
      const translated = t(slug);
      // אם התרגום זהה ל-slug, זה אומר שלא נמצא תרגום
      if (translated === slug) {
        return fallback || slug;
      }
      return translated;
    } catch (error) {
      return fallback || slug;
    }
  };

  return {
    getTeamName,
    getTeamNameSafe,
  };
}
