"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loadFromLocalStorage } from "@/lib/utils";
import { League } from "@/types/league";
import { Fixture } from "@/types/fixture";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

/**
 * React Query Provider עם localStorage מפתחות נפרדים
 *
 * אחראי על:
 * 1. יצירת QueryClient
 * 2. טעינה מ-localStorage במפתחות נפרדים:
 *    - "all-leagues-with-teams" → הליגות
 *    - "hot-fixtures" → משחקים חמים
 *
 * זרימה:
 * - Provider → יוצר QueryClient, טוען מ-localStorage (fallback)
 * - ClientHydration → מזריק SSR data ל-cache + שומר ל-localStorage
 * - Hooks → קוראים מ-cache
 *
 * ✅ כל סוג מידע נשמר במפתח localStorage נפרד
 */
export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 60 * 1000, // 10 minutes - המידע נחשב "טרי"
            gcTime: 24 * 60 * 60 * 1000, // 24 hours - זמן שמירה ב-cache
            retry: 2,
            refetchOnWindowFocus: false, // לא לעשות refetch כשחוזרים לחלון
            refetchOnMount: false, // לא לעשות refetch בכניסה לדף
            refetchOnReconnect: true, // כן לעשות refetch כשחוזרים לאינטרנט
          },
        },
      })
  );

  // טעינה מ-localStorage בטעינה ראשונה (fallback לדפים ללא SSR)
  React.useEffect(() => {
    // טעינת ליגות אם אין ב-cache
    const hasLeaguesCache = client.getQueryData(["all-leagues-with-teams"]);
    if (!hasLeaguesCache) {
      const cachedLeagues = loadFromLocalStorage<League>(
        "all-leagues-with-teams"
      );
      if (cachedLeagues?.length) {
        client.setQueryData(["all-leagues-with-teams"], cachedLeagues);
      }
    }

    // טעינת משחקים חמים אם אין ב-cache
    const hasFixturesCache = client.getQueryData(["hot-fixtures"]);
    if (!hasFixturesCache) {
      const cachedFixtures = loadFromLocalStorage<Fixture>("hot-fixtures");
      if (cachedFixtures?.length) {
        client.setQueryData(["hot-fixtures"], cachedFixtures);
      }
    }
  }, [client]);

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
