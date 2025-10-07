import { useQuery } from "@tanstack/react-query";
import { League } from "@/types/league";
import LeagueService from "@/services/leagueService";

interface AllLeaguesResult {
  leagues: League[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook לקבלת כל הליגות עם הקבוצות שלהן
 * עובד עם נתונים מ-SSR ו-local storage cache
 */
export function useAllLeagues(): AllLeaguesResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["all-leagues-with-teams"],
    queryFn: async () => {
      const res = await LeagueService.getAllLeaguesWithTeams();
      if (!res.success) throw new Error(res.error || "שגיאה");
      return res.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    leagues: data || [],
    isLoading,
    error: error?.message || null,
  };
}
