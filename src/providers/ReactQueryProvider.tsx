"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

/**
 * React Query Provider
 * localStorage מנוהל ידנית בכל קומפוננטה:
 * - "all-leagues-with-teams" - כל הליגות עם הקבוצות
 * - "hot-fixtures" - המשחקים החמים
 */
export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [client] = React.useState(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 10 * 60 * 1000, // 10 minutes - המידע נחשב "טרי"
          gcTime: 30 * 60 * 1000, // 30 minutes - זמן שמירה ב-cache
          retry: 2,
          refetchOnWindowFocus: false, // לא לעשות refetch כשחוזרים לחלון
          refetchOnMount: false, // לא לעשות refetch בכניסה לדף
          refetchOnReconnect: true, // כן לעשות refetch כשחוזרים לאינטרנט
        },
      },
    });

    return queryClient;
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
