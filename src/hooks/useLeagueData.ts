import { useQuery } from "@tanstack/react-query";
import LeagueService from "@/services/leagueService";
import { League } from "@/types/league";

interface LeagueDataResult {
  league: League | null;
  leagueId: string | null;
  teams: any[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook פשוט ונקי לניהול נתוני הליגה
 * עובד ישירות עם React Query ללא תלות ב-navigationService
 */
export function useLeagueData(leagueSlug: string): LeagueDataResult {
  // טעינת כל הליגות עם הקבוצות שלהן
  const {
    data: allLeagues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-leagues-with-teams"],
    queryFn: () => LeagueService.getAllLeaguesWithTeams(),
    staleTime: 10 * 60 * 1000, // 10 דקות
    retry: 2,
    initialData: undefined, // ינסה לטעון מה-cache קודם
  });

  // מציאת הליגה והנתונים הנדרשים
  const league = allLeagues?.find((l) => l.slug === leagueSlug) || null;
  const leagueId = league?._id || league?.id || null;
  const teams = league?.teams || [];

  return {
    league,
    leagueId,
    teams,
    isLoading,
    error,
  };
}
