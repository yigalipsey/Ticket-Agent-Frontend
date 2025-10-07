import { useQuery } from "@tanstack/react-query";
import { Fixture } from "@/types/fixture";
import FixtureService from "@/services/fixtureService";

interface HotFixturesResult {
  fixtures: Fixture[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook לקבלת משחקים חמים
 * עובד עם נתונים מ-SSR ו-local storage cache
 */
export function useHotFixtures(): HotFixturesResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hot-fixtures"],
    queryFn: async () => {
      const res = await FixtureService.getHotFixtures(5);
      if (!res.success) throw new Error(res.error || "שגיאה");
      return res.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    fixtures: data || [],
    isLoading,
    error: error?.message || null,
  };
}
