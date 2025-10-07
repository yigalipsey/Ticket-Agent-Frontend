"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { League } from "@/types/league";
import { Fixture } from "@/types/fixture";

interface ReactQueryProviderProps {
  children: React.ReactNode;
  initialLeagues?: League[];
  initialFixtures?: Fixture[];
}

const LEAGUES_STORAGE_KEY = "allLeaguesCache";
const FIXTURES_STORAGE_KEY = "hotFixturesCache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

interface CachedData<T> {
  data: T[];
  timestamp: number;
}

function saveToLocalStorage<T>(data: T[], storageKey: string): void {
  // Only run on client side
  if (typeof window === "undefined") return;

  try {
    const cacheData: CachedData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(storageKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error("❌ [LocalStorage] Error saving to cache:", error);
  }
}

function loadFromLocalStorage<T>(storageKey: string): T[] | null {
  // Only run on client side
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(storageKey);
    if (!cached) return null;

    const cacheData: CachedData<T> = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(storageKey);
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
  initialFixtures,
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

    // Hydrate leagues with SSR data or localStorage
    if (initialLeagues?.length) {
      queryClient.setQueryData(["all-leagues-with-teams"], initialLeagues);
      saveToLocalStorage(initialLeagues, LEAGUES_STORAGE_KEY);
    } else {
      const cached = loadFromLocalStorage<League>(LEAGUES_STORAGE_KEY);
      if (cached) {
        queryClient.setQueryData(["all-leagues-with-teams"], cached);
      }
    }

    // Hydrate fixtures with SSR data or localStorage
    if (initialFixtures?.length) {
      queryClient.setQueryData(["hot-fixtures"], initialFixtures);
      saveToLocalStorage(initialFixtures, FIXTURES_STORAGE_KEY);
    } else {
      const cached = loadFromLocalStorage<Fixture>(FIXTURES_STORAGE_KEY);
      if (cached) {
        queryClient.setQueryData(["hot-fixtures"], cached);
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
