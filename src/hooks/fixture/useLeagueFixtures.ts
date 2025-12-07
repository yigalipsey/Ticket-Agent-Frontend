import { useQuery } from "@tanstack/react-query";
import { Fixture } from "@/types/fixture";
import FixtureService from "@/services/fixtureService";

interface UseLeagueFixturesOptions {
  limit?: number;
  page?: number;
  month?: string | null;
  venueId?: string | null;
  hasOffers?: boolean;
}

interface LeagueFixturesResult {
  fixtures: Fixture[];
  availableMonths: string[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * יצירת מפתח cache תואם לבקאנד
 * מבנה זהה ל-FixturesByLeagueCacheService.generateCacheKey
 */
function generateCacheKey(
  leagueId: string | null,
  opts: { month?: string | null; venueId?: string | null } = {}
): string {
  if (!leagueId) return "league:null:all";

  const { month = null, venueId = null } = opts;

  if (month) {
    return `league:${leagueId}:month:${month}`;
  }
  if (venueId) {
    return `league:${leagueId}:venue:${venueId}`;
  }
  return `league:${leagueId}:all`;
}

/**
 * Hook לקבלת משחקי ליגה עם פילטרים דינמיים + cache חכם
 *
 * לוגיקת Cache אוטומטית:
 * 1. **ללא פילטרים**: משתמש ב-initialData מ-SSR
 *    - Cache key: "league:{id}:all"
 *
 * 2. **venue בלבד**: בודק cache → אם אין, פונה לבקאנד
 *    - Cache key: "league:{id}:venue:{venueId}"
 *    - Backend query: { venueId }
 *
 * 3. **month או month+venue**: בודק cache → אם אין, פונה לבקאנד
 *    - Cache key: "league:{id}:month:{month}"
 *    - Backend query: { month }
 *    - venue מסונן ב-client (אם קיים)
 *
 * @param leagueId - מזהה הליגה
 * @param options - אפשרויות פילטור (limit, page, month, venueId)
 * @param initialFixtures - נתונים ראשוניים מ-SSR (משמש רק ללא פילטרים)
 * @returns {LeagueFixturesResult} משחקים, מצב טעינה, שגיאה ופונקציית refetch
 *
 * @example
 * ```tsx
 * // venue בלבד - פונה לבקאנד אם אין בקאש
 * const { fixtures } = useLeagueFixtures("league-123", {
 *   venueId: "venue-456"
 * });
 *
 * // חודש+venue - פונה לבקאנד לחודש, מסנן venue ב-client
 * const { fixtures } = useLeagueFixtures("league-123", {
 *   month: "2025-10",
 *   venueId: "venue-456"
 * });
 * ```
 */
export function useLeagueFixtures(
  leagueId: string | null,
  options: UseLeagueFixturesOptions = {},
  initialFixtures?: Fixture[]
): LeagueFixturesResult {
  const {
    limit, // לא נגדיר default - כך אם לא נשלח limit, הבקאנד יחזיר את כל המשחקים מה-cache
    page = 1,
    month = null,
    venueId = null,
    hasOffers = false,
  } = options;

  // יצירת cache key תואם לבקאנד
  const cacheKey = generateCacheKey(leagueId, {
    month,
    venueId: month ? null : venueId, // venue רק אם אין חודש
  });

  // האם זה המפתח הראשוני (ללא פילטרים)?
  const isInitialKey = !month && !venueId;

  const { data, isLoading, error, refetch } = useQuery({
    // מפתח cache זהה למבנה של הבקאנד
    queryKey: ["initial-league-fixtures", cacheKey],
    queryFn: async () => {
      if (!leagueId) return { fixtures: [], availableMonths: [] };

      // לוגיקת פילטור חכמה:
      // - אם יש חודש: שולף חודש, venue יסונן ב-client
      // - אם יש venue בלי חודש: שולף venue מהשרת
      // - אחרת: שולף הכל
      const queryOptions: {
        limit?: number;
        page: number;
        month: string | null;
        venueId: string | null;
        hasOffers: boolean;
      } = {
        page,
        month,
        venueId: month ? null : venueId, // venue רק אם אין חודש
        hasOffers,
      };
      // שולח limit רק אם הוא מוגדר - כך הבקאנד יחזיר את כל המשחקים מה-cache
      if (limit !== undefined) {
        queryOptions.limit = limit;
      }
      const result = await FixtureService.getLeagueFixtures(
        leagueId,
        queryOptions
      );

      if (!result.success) {
        throw new Error(result.error || "שגיאה בטעינת משחקי הליגה");
      }

      return result.data || { fixtures: [], availableMonths: [] };
    },
    enabled: !!leagueId, // רק אם יש leagueId
    // השתמש ב-initialData רק אם זה המפתח הראשוני (ללא פילטרים)
    initialData:
      isInitialKey && initialFixtures
        ? { fixtures: initialFixtures, availableMonths: [] }
        : undefined,
    staleTime: 30 * 60 * 1000, // 30 דקות - הקאש נשאר "טרי" זמן רב
    gcTime: 60 * 60 * 1000, // 60 דקות - זמן שמירת cache אחרי שהוא לא בשימוש
    refetchOnMount: false, // לא לעשות refetch כשהקומפוננטה עולה מחדש
    refetchOnWindowFocus: false, // לא לעשות refetch כשחוזרים לחלון
    placeholderData: (previousData) => previousData, // שומר נתונים קודמים בזמן טעינה
  });

  return {
    fixtures: data?.fixtures || [],
    availableMonths: data?.availableMonths || [],
    isLoading,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      refetch();
    },
  };
}
