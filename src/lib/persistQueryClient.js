import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const QUERY_STALE_TIME = 10 * 60 * 1000; // 10 דקות
export const QUERY_CACHE_TIME = 30 * 60 * 1000; // 30 דקות

// Persister ל-localStorage (רק בצד הלקוח)
export const persistQueryClient =
  typeof window !== "undefined"
    ? createSyncStoragePersister({
        storage: window.localStorage,
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      })
    : undefined; // עדיף undefined מאשר null
