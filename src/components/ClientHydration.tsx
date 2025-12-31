"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { saveToLocalStorage } from "@/lib/utils";
import { League } from "@/types/league";
import { Fixture } from "@/types/fixture";

interface ClientHydrationProps {
  initialLeagues?: League[];
  initialHotFixtures?: Fixture[];
}

/**
 * קומפוננטה סמויה שמזריקה SSR data ל-React Query cache + localStorage
 *
 * זרימה:
 * 1. Server (page.tsx) מביא את הנתונים מה-API
 * 2. ClientHydration מקבלת את הנתונים כ-props
 * 3. useEffect מזריק אותם ל-cache
 * 4. שמירה ב-localStorage במפתחות נפרדים:
 *    - localStorage["all-leagues-with-teams"]
 *    - localStorage["hot-fixtures"]
 * 5. Hooks אחרים (useAllLeagues, useHotFixtures) קוראים מה-cache
 *
 * ⚠️ קומפוננטה זו לא מציגה UI - רק עושה hydration
 */
export default function ClientHydration({
  initialLeagues,
  initialHotFixtures,
}: ClientHydrationProps) {
  const queryClient = useQueryClient();
  const hydratedRef = useRef({ leagues: false, fixtures: false });

  useEffect(() => {
    // Hydration של ליגות → cache + localStorage["all-leagues-with-teams"]
    if (initialLeagues?.length && !hydratedRef.current.leagues) {
      queryClient.setQueryData(["all-leagues-with-teams"], initialLeagues);
      saveToLocalStorage(initialLeagues, "all-leagues-with-teams");
      hydratedRef.current.leagues = true;
    }

    // Hydration של משחקים חמים → cache + localStorage["hot-fixtures"]
    if (initialHotFixtures?.length && !hydratedRef.current.fixtures) {
      queryClient.setQueryData(["hot-fixtures"], initialHotFixtures);
      saveToLocalStorage(initialHotFixtures, "hot-fixtures");
      hydratedRef.current.fixtures = true;
    }
  }, [queryClient, initialLeagues, initialHotFixtures]);

  return null; // לא מציגים כלום - רק hydration
}
