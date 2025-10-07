import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { League } from "@/types/league";
import LeagueService from "@/services/leagueService";
import { loadFromLocalStorage, LEAGUES_STORAGE_KEY } from "@/lib/utils";

interface AllLeaguesResult {
  leagues: League[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook לקבלת כל הליגות עם הקבוצות שלהן
 * עובד עם נתונים מ-SSR, React Query cache ו-localStorage
 */
export function useAllLeagues(): AllLeaguesResult {
  const [isHydrated, setIsHydrated] = useState(false);

  // ניסיון לטעון מ-localStorage רק אחרי hydration
  const cachedLeagues = useMemo(() => {
    if (!isHydrated) return null;
    return loadFromLocalStorage<League>(LEAGUES_STORAGE_KEY);
  }, [isHydrated]);

  // Mark as hydrated after first render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["all-leagues-with-teams"],
    queryFn: async () => {
      console.log("🔥 [useAllLeagues] API Call (fallback)");
      const res = await LeagueService.getAllLeaguesWithTeams();
      if (!res.success) throw new Error(res.error || "שגיאה");
      return res.data;
    },
    // אם יש data ב-localStorage, השתמש בה כ-initialData
    initialData: cachedLeagues || undefined,
    // לא לעשות fetch אם יש initialData
    enabled: !cachedLeagues,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    leagues: data || [],
    // במהלך hydration, תמיד להציג loading
    isLoading: !isHydrated || (isLoading && !data),
    error: error?.message || null,
  };
}
