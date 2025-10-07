"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { League } from "@/types/league";

interface ReactQueryProviderProps {
  children: React.ReactNode;
  initialLeagues?: League[];
}

const STORAGE_KEY = "allLeaguesCache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

interface CachedData {
  data: League[];
  timestamp: number;
}

function saveToLocalStorage(leagues: League[]): void {
  // Only run on client side
  if (typeof window === "undefined") return;

  try {
    const cacheData: CachedData = {
      data: leagues,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("❌ [LocalStorage] Error saving to cache:", error);
  }
}

function loadFromLocalStorage(): League[] | null {
  // Only run on client side
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return null;

    const cacheData: CachedData = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return cacheData.data;
  } catch (error) {
    console.error("❌ [LocalStorage] Error loading from cache:", error);
    return null;
  }
}

export default function ReactQueryProvider({
  children,
  initialLeagues,
}: ReactQueryProviderProps) {
  const [client] = React.useState(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 10 * 60 * 1000, // 10 minutes
          gcTime: 30 * 60 * 1000, // 30 minutes
          retry: 2,
          refetchOnWindowFocus: false,
        },
      },
    });

    // Hydrate with SSR data or localStorage
    if (initialLeagues?.length) {
      queryClient.setQueryData(["all-leagues-with-teams"], initialLeagues);
      saveToLocalStorage(initialLeagues);
    } else {
      const cached = loadFromLocalStorage();
      if (cached) {
        queryClient.setQueryData(["all-leagues-with-teams"], cached);
      }
    }

    return queryClient;
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
