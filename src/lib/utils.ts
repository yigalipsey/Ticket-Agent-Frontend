import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";
import { he } from "date-fns/locale";

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(
  date: string | Date,
  formatStr: string = "dd/MM/yyyy"
): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return "";
    return format(dateObj, formatStr, { locale: he });
  } catch {
    return "";
  }
}

export function formatTime(date: string | Date): string {
  return formatDate(date, "HH:mm");
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, "dd/MM/yyyy HH:mm");
}

// Currency formatting
export function formatCurrency(
  amount: number,
  currency: string = "ILS"
): string {
  const symbols = {
    ILS: "₪",
    USD: "$",
    EUR: "€",
  };

  const symbol = symbols[currency as keyof typeof symbols] || currency;
  return `${symbol}${amount.toLocaleString()}`;
}

// Text utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// URL utilities
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(
  array: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

// Local storage cache duration
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

interface CachedData<T> {
  data: T[];
  timestamp: number;
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Handle storage errors silently
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch {
    // Handle storage errors silently
  }
}

// Cache-specific utilities
export function saveToLocalStorage<T>(data: T[], storageKey: string): void {
  if (typeof window === "undefined") return;

  try {
    const cachedData: CachedData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(storageKey, JSON.stringify(cachedData));
  } catch (error: any) {
    console.error(
      `❌ [localStorage] Failed to save "${storageKey}":`,
      error.name
    );

    // אם זו שגיאת quota - ננסה לנקות cache ישן
    if (error.name === "QuotaExceededError") {
      console.warn("⚠️ localStorage quota exceeded! Clearing old cache...");
      try {
        localStorage.removeItem(storageKey);
        localStorage.setItem(storageKey, JSON.stringify(cachedData));
      } catch (retryError) {
        console.error("❌ Retry failed - localStorage full");
      }
    }
  }
}

export function loadFromLocalStorage<T>(storageKey: string): T[] | null {
  if (typeof window === "undefined") return null;

  try {
    const item = localStorage.getItem(storageKey);
    if (!item) return null;

    const cachedData: CachedData<T> = JSON.parse(item);

    // Check if cache is expired
    if (Date.now() - cachedData.timestamp > CACHE_DURATION) {
      localStorage.removeItem(storageKey);
      return null;
    }

    return cachedData.data;
  } catch (error) {
    console.warn("Failed to load from localStorage:", error);
    return null;
  }
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Debounce utility
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
