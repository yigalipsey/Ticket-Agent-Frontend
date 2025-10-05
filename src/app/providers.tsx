"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";
import {
  persistQueryClient,
  QUERY_STALE_TIME,
  QUERY_CACHE_TIME,
} from "@/lib/persistQueryClient";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME, // 10 minutes
            gcTime: QUERY_CACHE_TIME, // 30 minutes
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // אם יש persister זמין (בצד הלקוח), השתמש בו
  if (persistQueryClient) {
    return (
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: persistQueryClient,
          maxAge: QUERY_CACHE_TIME,
          dehydrateOptions: {
            shouldDehydrateQuery: (query): boolean => {
              // נשמור מפתחות של ליגות, קבוצות ומשחקים
              const queryKey = query.queryKey[0] as string;
              return (
                queryKey === "all-leagues-with-teams" ||
                queryKey === "league-fixtures" ||
                queryKey === "fixtures" ||
                queryKey === "football-events" ||
                (queryKey.startsWith("league-") && !!query.queryKey[1]) ||
                (queryKey === "team-fixtures" && !!query.queryKey[1])
              );
            },
          },
        }}
        onSuccess={() => {
          // Query Client restored from localStorage
        }}
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistQueryClientProvider>
    );
  }

  // בצד השרת או כשאין persister זמין
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
