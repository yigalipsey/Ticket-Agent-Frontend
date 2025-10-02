/**
 * טיפוסים למערכת התרגומים
 */

export type Locale = "en" | "he";

export type EntityType = "teams" | "leagues" | "countries";

export type UITranslations = {
  common: Record<string, string>;
  navigation: Record<string, string>;
  home: Record<string, string>;
  fixtures: {
    title: string;
    upcoming: string;
    finished: string;
    postponed: string;
    noFixtures: string;
    viewOffers: string;
    lowestPrice: string;
    totalOffers: string;
    status: {
      scheduled: string;
      finished: string;
      postponed: string;
    };
  };
  leagues: Record<string, string>;
  teams: Record<string, string>;
  venues: Record<string, string>;
  offers: Record<string, string>;
  search: Record<string, string>;
  filters: Record<string, string>;
  pagination: Record<string, string>;
};

export type DataTranslations = Record<string, string>;

export type AllTranslations = {
  common: Record<string, string>;
  navigation: Record<string, string>;
  home: Record<string, string>;
  fixtures: {
    title: string;
    upcoming: string;
    finished: string;
    postponed: string;
    noFixtures: string;
    viewOffers: string;
    lowestPrice: string;
    totalOffers: string;
    status: {
      scheduled: string;
      finished: string;
      postponed: string;
    };
  };
  leagues: Record<string, string>;
  teams: Record<string, string>;
  venues: Record<string, string>;
  offers: Record<string, string>;
  search: Record<string, string>;
  filters: Record<string, string>;
  pagination: Record<string, string>;
  data: {
    teams: DataTranslations;
    leagues: DataTranslations;
    countries: DataTranslations;
  };
};

export interface TranslationCache {
  get(key: string): DataTranslations | undefined;
  set(key: string, value: DataTranslations): void;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): void;
}

export interface TranslationError {
  type: "missing_translation" | "load_error" | "fallback_used";
  key: string;
  entityType?: EntityType;
  locale?: Locale;
  message: string;
  timestamp: Date;
}

export interface TranslationMetrics {
  cacheHits: number;
  cacheMisses: number;
  fallbacksUsed: number;
  errors: TranslationError[];
}
