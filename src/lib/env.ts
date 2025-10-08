/**
 * Environment configuration
 * This file helps debug and validate environment variables
 */

export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
} as const;

/**
 * Log environment configuration (only in development)
 */
export function logEnvConfig() {
  if (typeof window !== "undefined" && !ENV.IS_PRODUCTION) {
    console.log("🌍 Environment Configuration:", {
      NODE_ENV: process.env.NODE_ENV,
      API_URL: ENV.API_URL,
      IS_PRODUCTION: ENV.IS_PRODUCTION,
      IS_DEVELOPMENT: ENV.IS_DEVELOPMENT,
    });
  }
}

/**
 * Validate that all required environment variables are set
 */
export function validateEnv() {
  const errors: string[] = [];

  if (!ENV.API_URL) {
    errors.push("NEXT_PUBLIC_API_URL is not set");
  }

  if (errors.length > 0) {
    console.error("❌ Environment validation failed:", errors);
    return false;
  }

  return true;
}

// Auto-validate on import (only in browser)
if (typeof window !== "undefined") {
  logEnvConfig();
  validateEnv();
}

export default ENV;
