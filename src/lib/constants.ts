// API Endpoints
export const API_ENDPOINTS = {
  FIXTURES: "/fixtures",
  FOOTBALL_EVENTS: "/football-events",
  LEAGUES: "/leagues",
  TEAMS: "/teams",
  VENUES: "/venues",
  OFFERS: "/offers",
  SEARCH: "/search",
} as const;

// App Constants
export const APP_CONFIG = {
  NAME: "TicketAgent",
  DESCRIPTION: "השוואת כרטיסים למשחקי כדורגל",
  VERSION: "1.0.0",
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const;

// Currency
export const CURRENCIES = {
  ILS: "₪",
  USD: "$",
  EUR: "€",
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "dd/MM/yyyy",
  API: "yyyy-MM-dd",
  TIME: "HH:mm",
  DATETIME: "dd/MM/yyyy HH:mm",
} as const;

// Fixture Status
export const FIXTURE_STATUS = {
  SCHEDULED: "scheduled",
  FINISHED: "finished",
  POSTPONED: "postponed",
} as const;

// Offer Categories
export const OFFER_CATEGORIES = {
  VIP: "VIP",
  PREMIUM: "Premium",
  STANDARD: "Standard",
  ECONOMY: "Economy",
} as const;

// Sort Options
export const SORT_OPTIONS = {
  DATE_ASC: { value: "date_asc", label: "תאריך - עולה" },
  DATE_DESC: { value: "date_desc", label: "תאריך - יורד" },
  PRICE_ASC: { value: "price_asc", label: "מחיר - עולה" },
  PRICE_DESC: { value: "price_desc", label: "מחיר - יורד" },
  POPULARITY: { value: "popularity", label: "פופולריות" },
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_PREFERENCES: "user_preferences",
  LANGUAGE: "language",
  THEME: "theme",
  RECENT_SEARCHES: "recent_searches",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "שגיאת רשת. אנא נסה שוב.",
  UNAUTHORIZED: "אינך מורשה לבצע פעולה זו.",
  NOT_FOUND: "המידע המבוקש לא נמצא.",
  VALIDATION_ERROR: "שגיאת ולידציה. אנא בדוק את הנתונים.",
  SERVER_ERROR: "שגיאת שרת. אנא נסה שוב מאוחר יותר.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: "נשמר בהצלחה",
  DELETED: "נמחק בהצלחה",
  UPDATED: "עודכן בהצלחה",
  CREATED: "נוצר בהצלחה",
} as const;
