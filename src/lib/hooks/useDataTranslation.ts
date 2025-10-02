"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { loadDataTranslations, hasTranslation } from "@/lib/i18n/loaders";
import type { EntityType, Locale } from "@/lib/i18n/types";

/**
 * Hook לתרגום Data Entities
 * טוען תרגומים דינמית עם cache
 */
export function useDataTranslation(entityType: EntityType) {
  const locale = useLocale() as Locale;
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadDataTranslations(entityType, locale);
        setTranslations(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load translations"
        );
        console.error(`Error loading ${entityType} translations:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [entityType, locale]);

  const getTranslation = (slug: string, fallback?: string): string => {
    if (loading) return fallback || slug;
    if (error) return fallback || slug;

    return translations[slug] || fallback || slug;
  };

  const hasTranslation = (slug: string): boolean => {
    return !loading && !error && slug in translations;
  };

  return {
    getTranslation,
    hasTranslation,
    loading,
    error,
    translations,
  };
}

/**
 * Hook ספציפי לתרגום קבוצות
 */
export function useTeamTranslation() {
  const { getTranslation, hasTranslation, loading, error } =
    useDataTranslation("teams");

  const getTeamName = (slug: string, fallback?: string): string => {
    return getTranslation(slug, fallback);
  };

  return {
    getTeamName,
    hasTeamTranslation: hasTranslation,
    loading,
    error,
  };
}

/**
 * Hook ספציפי לתרגום ליגות
 */
export function useLeagueTranslation() {
  const { getTranslation, hasTranslation, loading, error } =
    useDataTranslation("leagues");

  const getLeagueName = (slug: string, fallback?: string): string => {
    return getTranslation(slug, fallback);
  };

  return {
    getLeagueName,
    hasLeagueTranslation: hasTranslation,
    loading,
    error,
  };
}
