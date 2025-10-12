import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { LeagueService } from "@/services";
import { navigationService } from "@/services/navigationService";

interface TeamDataResult {
  teamId: string | null;
  isLoading: boolean;
  error: Error | null;
}

export function useTeamData(teamSlug: string): TeamDataResult {
  const [teamId, setTeamId] = useState<string | null>(null);

  // בדיקה ראשונה אם NavigationService כבר מאותחל עם נתונים מהלוקאל סטורג
  useEffect(() => {
    if (navigationService.isInitialized()) {
      const foundTeamId = navigationService.getTeamIdBySlug(teamSlug);
      setTeamId(foundTeamId);
    }
  }, [teamSlug]);

  // טעינת נתונים מהשרת רק אם אין במחסנית המקום מקומי
  const {
    data: result,
    isLoading: leaguesLoading,
    error: leaguesError,
  } = useQuery({
    queryKey: ["all-leagues-with-teams"], // שימוש באותו queryKey כמו בדף הבית
    queryFn: async () => {
      const serviceResult = await LeagueService.getAllLeaguesWithTeams();

      if (!serviceResult.success) {
        throw new Error(serviceResult.error || "שגיאה בטעינת הליגות");
      }
      return serviceResult.data;
    },
    staleTime: 10 * 60 * 1000,
    enabled: !navigationService.isInitialized(), // טעינה רק אם אין נתונים מקומיים
  });

  const allLeagues = useMemo(() => result || [], [result]);

  // אם טעינו נתונים מהשרת, נאתחל את NavigationService
  useEffect(() => {
    if (allLeagues.length > 0 && !navigationService.isInitialized()) {
      navigationService.init(allLeagues);

      const foundTeamId = navigationService.getTeamIdBySlug(teamSlug);
      setTeamId(foundTeamId);
    }
  }, [allLeagues, teamSlug]);

  // טעינת משחקי הקבוצה באמצעות מזהה המונגו
  const {
    fixtures = [],
    isLoading: fixturesLoading,
    error: fixturesError,
  } = useTeamFixtures(teamId || "", {
    query: filters,
    autoFetch: !!teamId,
  });

  // חישוב סבבים זמינים
  const availableRounds =
    fixtures && fixtures.length > 0
      ? Array.from(
          new Set(fixtures.map((f: Fixture) => f.round).filter(Boolean))
        )
          .sort(
            (a: unknown, b: unknown) =>
              Number(a as string) - Number(b as string)
          )
          .map(String)
      : [];

  return {
    teamId,
    fixtures,
    isLoading: fixturesLoading,
    error: fixturesError ? new Error(fixturesError) : null,
    availableRounds,
  };
}
