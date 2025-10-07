import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { League } from "@/types/league";
import LeagueService from "@/services/leagueService";

interface UseLeagueDataOptimizedProps {
  slug: string;
  withTeams?: boolean;
  initialData?: League;
  enabled?: boolean;
}

/**
 * Hook מותאם לשליפת מידע ליגה עם אופטימיזציה מלאה:
 * 1. SSR - אם יש initialData, משתמש בו
 * 2. React Query Cache - persisted ב-localStorage אוטומטית
 * 3. אם אין מידע - עושה fetch (fallback בלבד)
 *
 * ⚠️ במרבית המקרים המידע כבר יהיה זמין מדף הבית (all-leagues-with-teams)
 */
export const useLeagueDataOptimized = ({
  slug,
  withTeams = false,
  initialData,
  enabled = true,
}: UseLeagueDataOptimizedProps) => {
  // Query key עקבי - חשוב להתאמה ל-SSR hydration
  const queryKey = useMemo(
    () => ["league", slug, { withTeams }] as const,
    [slug, withTeams]
  );

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      console.log("🔥 [useLeagueDataOptimized] API Call (fallback):", slug);
      const result = await LeagueService.getLeagueBySlug(slug, withTeams);
      if (result.success && result.data) {
        return result.data;
      }
      throw new Error(result.error || "Failed to fetch league");
    },
    // initialData מ-SSR - ימנע fetch אוטומטית
    initialData,
    // לא לעשות fetch אם:
    // 1. יש initialData
    // 2. יש data ב-cache (מדף הבית או מ-localStorage persistence)
    // 3. enabled=false
    enabled: enabled && !initialData,
    // Cache configuration
    staleTime: 1000 * 60 * 10, // 10 דקות - המידע "טרי"
    gcTime: 1000 * 60 * 30, // 30 דקות - שמירה ב-memory
    // Refetch configuration - אופטימלי למניעת בקשות מיותרות
    refetchOnMount: false, // לא refetch כשהקומפוננטה עולה
    refetchOnWindowFocus: false, // לא refetch כשחוזרים לחלון
    refetchOnReconnect: false, // לא refetch כשחוזרים לאינטרנט
    // Retry configuration
    retry: 1,
    retryDelay: 1000,
  });

  return {
    ...query,
    league: query.data,
    // Loading רק אם אין data בכלל
    isLoading: query.isLoading && !query.data,
  };
};
