import { useQuery } from "@tanstack/react-query";
import { League } from "@/types/league";
import LeagueService from "@/services/leagueService";

interface AllLeaguesResult {
  leagues: League[];
  isLoading: boolean;
  error: string | null;
}

export function useAllLeagues(): AllLeaguesResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["all-leagues-with-teams"],
    queryFn: async () => {
      const res = await LeagueService.getAllLeaguesWithTeams();
      if (!res.success) throw new Error(res.error || "שגיאה");
      return res.data;
    },
    // לא לעשות fetch מיידי - רק אם אין cache
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    leagues: data || [],
    isLoading,
    error: error?.message || null,
  };
}
