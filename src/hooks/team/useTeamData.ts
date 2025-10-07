import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { LeagueService } from "@/services";
import { navigationService } from "@/services/navigationService";
import { useTeamFixtures } from "@/hooks/team/useTeamFixtures";
import { Fixture } from "@/types";

interface TeamFilters {
  limit?: number;
  upcoming?: string;
}

interface TeamDataResult {
  teamId: string | null;
  fixtures: Fixture[];
  isLoading: boolean;
  error: Error | null;
  availableRounds: string[];
}

export function useTeamData(
  teamSlug: string,
  filters: TeamFilters
): TeamDataResult {
  const [teamId, setTeamId] = useState<string | null>(null);

  // בדיקה ראשונה אם NavigationService כבר מאותחל עם נתונים מהלוקאל סטורג
  useEffect(() => {
    if (navigationService.isInitialized()) {
      const foundTeamId = navigationService.getTeamIdBySlug(teamSlug);
      console.log(
        "🔍 מזהה קבוצה מהלוקאל סטורג עבור",
        teamSlug,
        ":",
        foundTeamId
      );
      setTeamId(foundTeamId);
    } else {
      console.log("NavigationService לא מאותחל עדיין");
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
      console.log(
        "🚀 אתחול navigationService עם נתוני שרת כי אין נתונים מקומיים"
      );
      navigationService.init(allLeagues);

      const foundTeamId = navigationService.getTeamIdBySlug(teamSlug);
      console.log(
        "🔍 מזהה קבוצה אחר אתחול שרת עבור",
        teamSlug,
        ":",
        foundTeamId
      );
      setTeamId(foundTeamId);
    }
  }, [allLeagues, teamSlug]);

  // לוג לדיבוג
  console.log("🔍 [useTeamData] Debug:", {
    leaguesCount: allLeagues.length,
    isLoading: leaguesLoading,
    error: leaguesError,
    teamSlug,
    navigationServiceInitialized: navigationService.isInitialized(),
    teamIdFound: !!teamId,
  });

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

  // לוג לדיבוג
  console.log("🔍 [useTeamData] Fixtures Debug:", {
    teamSlug,
    teamId,
    fixturesCount: fixtures.length,
    availableRounds: availableRounds.length,
    isLoading: fixturesLoading,
    error: fixturesError,
    filtersUsed: filters,
  });

  return {
    teamId,
    fixtures,
    isLoading: fixturesLoading,
    error: fixturesError ? new Error(fixturesError) : null,
    availableRounds,
  };
}
