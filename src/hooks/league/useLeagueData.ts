import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import LeagueService from "@/services/leagueService";
import { League } from "@/types/league";

interface LeagueDataResult {
  league: League | null;
  leagueId: string | null;
  teams: League["teams"];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook לשליפת ליגה בודדת
 *
 * זרימה חכמה (תומכת בשני מצבים):
 * 1. ניווט פנימי (מהדף הראשי):
 *    - בודק cache של "all-leagues-with-teams" לפי slug
 *    - מוצא → מחזיר מיד ללא API call ⚡
 *
 * 2. נחיתה ישירה (לינק חיצוני):
 *    - אין cache → משתמש ב-leagueId לקריאת API (GET /leagues/:id?withTeams=true)
 */
export function useLeagueData(
  leagueSlug: string,
  leagueId: string | null
): LeagueDataResult {
  const queryClient = useQueryClient();

  // ניסיון #1: חיפוש ב-cache של כל הליגות (מהדף הראשי) לפי slug
  const leagueFromAllLeaguesCache = useMemo(() => {
    const allLeagues = queryClient.getQueryData<League[]>([
      "all-leagues-with-teams",
    ]);
    return allLeagues?.find((l) => l.slug === leagueSlug);
  }, [queryClient, leagueSlug]);

  // רק נעשה fetch אם:
  // 1. אין cache מהדף הראשי
  // 2. יש leagueId זמין (מה-SSR)
  const shouldFetch = !leagueFromAllLeaguesCache && !!leagueId;

  const {
    data: league,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["league", leagueId, { withTeams: true }],
    queryFn: async () => {
      if (!leagueId) {
        throw new Error("League ID is required");
      }
      const result = await LeagueService.getLeague(leagueId, true);
      if (!result.success || !result.data) {
        throw new Error(result.error || "שגיאה בטעינת הליגה");
      }
      return result.data;
    },
    enabled: shouldFetch, // 👈 רק אם אין cache וגם יש ID!
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  const finalLeague = leagueFromAllLeaguesCache || league;
  const finalLeagueId = finalLeague?._id || finalLeague?.id || leagueId || null;
  const teams = finalLeague?.teams || [];

  return {
    league: finalLeague || null,
    leagueId: finalLeagueId,
    teams,
    isLoading: shouldFetch ? isLoading : false,
    error,
  };
}
