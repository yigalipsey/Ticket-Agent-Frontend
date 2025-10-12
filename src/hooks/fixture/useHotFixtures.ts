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
 *
 * זרימה:
 * 1. ClientHydration הזריק את הנתונים ל-cache (מ-SSR או localStorage)
 * 2. Hook זה פשוט קורא מה-cache
 * 3. אם אין cache - עושה fallback API call
 *
 * ⚠️ במצב תקין, לא אמור להיות API call כי הנתונים כבר ב-cache
 */
export function useHotFixtures(): HotFixturesResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hot-fixtures"],
    queryFn: async () => {
      const res = await FixtureService.getHotFixtures(5);
      if (!res.success) throw new Error(res.error || "שגיאה");
      return res.data;
    },
    // לא לעשות fetch מיידי - רק אם אין cache
    staleTime: Infinity, // הנתונים תמיד "טריים" (ClientHydration עשה hydration)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    fixtures: data || [],
    isLoading,
    error: error?.message || null,
  };
}
