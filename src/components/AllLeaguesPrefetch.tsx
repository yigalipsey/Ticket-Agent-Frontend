"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import PopularLeaguesSection from "@/components/home/PopularLeaguesSection";
import { League } from "@/types/league";
import { saveToLocalStorage } from "@/lib/utils";

interface AllLeaguesPrefetchProps {
  initialLeagues?: League[];
}

const STORAGE_KEY = "all-leagues-with-teams";

/**
 * Component להזרקת הליגות ל-React Query cache + localStorage
 * מקבל initialLeagues מ-SSR ושומר ב-cache וב-localStorage
 */
export default function AllLeaguesPrefetch({
  initialLeagues,
}: AllLeaguesPrefetchProps) {
  const queryClient = useQueryClient();

  // הזרקת הליגות ל-cache + localStorage
  useEffect(() => {
    if (initialLeagues && initialLeagues.length > 0) {
      // שמירה ב-React Query cache
      queryClient.setQueryData(["all-leagues-with-teams"], initialLeagues);

      // שמירה ב-localStorage עם מפתח נפרד
      saveToLocalStorage(initialLeagues, STORAGE_KEY);

      console.log(
        "✅ [AllLeaguesPrefetch] Saved",
        initialLeagues.length,
        "leagues to cache & localStorage"
      );
    }
  }, [initialLeagues, queryClient]);

  return <PopularLeaguesSection />;
}
