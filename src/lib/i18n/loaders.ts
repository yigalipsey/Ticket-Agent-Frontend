/**
 * מערכת טעינה דינמית של תרגומים
 * מפרידה בין UI strings ל-Data entities
 */

import type { Locale } from "next-intl";
import type {
  EntityType,
  DataTranslations,
  UITranslations,
  AllTranslations,
  TranslationError,
  TranslationMetrics,
} from "./types";

// Cache לתרגומים עם Type Safety
const uiTranslationCache = new Map<string, UITranslations>();
const dataTranslationCache = new Map<string, DataTranslations>();

// מערכת monitoring
let metrics: TranslationMetrics = {
  cacheHits: 0,
  cacheMisses: 0,
  fallbacksUsed: 0,
  errors: [],
};

// פונקציות monitoring
function logError(error: TranslationError) {
  metrics.errors.push(error);
  if (process.env.NODE_ENV === "development") {
    console.warn(`[Translation Error] ${error.type}: ${error.message}`, {
      key: error.key,
      entityType: error.entityType,
      locale: error.locale,
    });
  }
}

function logCacheHit() {
  metrics.cacheHits++;
}

function logCacheMiss() {
  metrics.cacheMisses++;
}

function logFallback(key: string, entityType?: EntityType, locale?: Locale) {
  metrics.fallbacksUsed++;
  logError({
    type: "fallback_used",
    key,
    entityType,
    locale,
    message: `Fallback used for ${key}`,
    timestamp: new Date(),
  });
}

/**
 * טוען תרגומי UI (סטטיים)
 */
export async function loadUITranslations(
  locale: Locale
): Promise<UITranslations> {
  const cacheKey = `ui-${locale}`;

  if (uiTranslationCache.has(cacheKey)) {
    logCacheHit();
    return uiTranslationCache.get(cacheKey)!;
  }

  logCacheMiss();
  try {
    // Static imports instead of dynamic imports
    let translations;
    if (locale === "he") {
      translations = await import("../../../messages/ui.he.json");
    } else {
      translations = await import("../../../messages/ui.en.json");
    }
    const uiTranslations = translations.default as UITranslations;
    uiTranslationCache.set(cacheKey, uiTranslations);
    return uiTranslations;
  } catch (error) {
    logError({
      type: "load_error",
      key: cacheKey,
      locale,
      message: `Failed to load UI translations for ${locale}`,
      timestamp: new Date(),
    });

    // Fallback לאנגלית
    if (locale !== "en") {
      logFallback(cacheKey, undefined, locale);
      return loadUITranslations("en");
    }
    return {} as UITranslations;
  }
}

/**
 * טוען תרגומי Data Entities (דינמיים)
 */
export async function loadDataTranslations(
  entityType: EntityType,
  locale: Locale
): Promise<DataTranslations> {
  const cacheKey = `${entityType}-${locale}`;

  if (dataTranslationCache.has(cacheKey)) {
    logCacheHit();
    return dataTranslationCache.get(cacheKey)!;
  }

  logCacheMiss();
  try {
    // Static imports instead of dynamic imports
    let translations;
    const path = `@/lib/data/${entityType}/translations.${locale}.json`;
    if (locale === "he") {
      translations = await import(
        `@/lib/data/${entityType}/translations.he.json`
      );
    } else {
      translations = await import(
        `@/lib/data/${entityType}/translations.en.json`
      );
    }
    const dataTranslations = translations.default as DataTranslations;
    dataTranslationCache.set(cacheKey, dataTranslations);
    return dataTranslations;
  } catch (error) {
    logError({
      type: "load_error",
      key: cacheKey,
      entityType,
      locale,
      message: `Failed to load ${entityType} translations for ${locale}`,
      timestamp: new Date(),
    });

    // Fallback לאנגלית
    if (locale !== "en") {
      logFallback(cacheKey, entityType, locale);
      return loadDataTranslations(entityType, "en");
    }
    return {};
  }
}

/**
 * טוען תרגומים מעורבים (UI + Data)
 */
export async function loadAllTranslations(locale: Locale) {
  const [uiTranslations, teamsTranslations, leaguesTranslations] =
    await Promise.all([
      loadUITranslations(locale),
      loadDataTranslations("teams", locale),
      loadDataTranslations("leagues", locale),
    ]);

  return {
    ...uiTranslations,
    data: {
      teams: teamsTranslations,
      leagues: leaguesTranslations,
    },
  };
}

/**
 * מנקה את ה-cache
 */
export function clearTranslationCache() {
  uiTranslationCache.clear();
  dataTranslationCache.clear();
}

/**
 * מנקה תרגום ספציפי מה-cache
 */
export function clearTranslationCacheFor(
  entityType?: EntityType,
  locale?: Locale
) {
  if (entityType && locale) {
    const cacheKey = `${entityType}-${locale}`;
    dataTranslationCache.delete(cacheKey);
  } else if (entityType) {
    // מנקה את כל התרגומים של ה-entity type
    for (const key of dataTranslationCache.keys()) {
      if (key.startsWith(`${entityType}-`)) {
        dataTranslationCache.delete(key);
      }
    }
  } else {
    // מנקה הכל
    clearTranslationCache();
  }
}

/**
 * Prefetch חכם - טוען תרגומים מראש
 */
export async function prefetchTranslations(
  locale: Locale,
  entityTypes: EntityType[] = ["teams", "leagues"]
): Promise<void> {
  const promises = [
    loadUITranslations(locale),
    ...entityTypes.map((type) => loadDataTranslations(type, locale)),
  ];

  try {
    await Promise.all(promises);
    console.log(
      `[Translation Prefetch] Loaded translations for ${locale}:`,
      entityTypes
    );
  } catch (error) {
    logError({
      type: "load_error",
      key: `prefetch-${locale}`,
      locale,
      message: `Failed to prefetch translations for ${locale}`,
      timestamp: new Date(),
    });
  }
}

/**
 * מחזיר metrics של המערכת
 */
export function getTranslationMetrics(): TranslationMetrics {
  return { ...metrics };
}

/**
 * מנקה metrics
 */
export function clearTranslationMetrics(): void {
  metrics = {
    cacheHits: 0,
    cacheMisses: 0,
    fallbacksUsed: 0,
    errors: [],
  };
}

/**
 * בודק אם תרגום קיים
 */
export function hasTranslation(
  entityType: EntityType,
  locale: Locale,
  key: string
): boolean {
  const cacheKey = `${entityType}-${locale}`;
  const translations = dataTranslationCache.get(cacheKey);
  return translations ? key in translations : false;
}

/**
 * מחזיר רשימת מפתחות חסרים
 */
export function getMissingTranslations(
  entityType: EntityType,
  locale: Locale
): string[] {
  const cacheKey = `${entityType}-${locale}`;
  const translations = dataTranslationCache.get(cacheKey);
  if (!translations) return [];

  // בודק מול האנגלית
  const enTranslations = dataTranslationCache.get(`${entityType}-en`);
  if (!enTranslations) return [];

  return Object.keys(enTranslations).filter((key) => !(key in translations));
}
