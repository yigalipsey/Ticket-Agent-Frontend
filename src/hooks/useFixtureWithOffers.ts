"use client";

import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useOffersByFixture, useFixture } from "@/hooks";

export function useFixtureWithOffers(idOrSlug: string) {
  const queryClient = useQueryClient();

  // בדיקה אם זה ObjectID או slug
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

  // שליפת ID לפי slug (רק אם זה לא ObjectID)
  const fixtureId = useMemo(() => {
    if (isObjectId) {
      console.log("🔍 useFixtureWithOffers: Using direct ID:", idOrSlug);
      return idOrSlug;
    }

    // אם זה slug, נשתמש בו ישירות
    console.log("🔍 useFixtureWithOffers: Using slug:", idOrSlug);
    return idOrSlug;
  }, [idOrSlug, isObjectId]);

  // חיפוש המשחק ב-cache של TanStack Query
  const cachedFixture = useMemo(() => {
    // חיפוש בכל ה-queries של משחקים
    const queries = queryClient.getQueriesData({
      queryKey: ["league-fixtures"],
    });

    for (const [, data] of queries) {
      if (data && typeof data === "object" && "data" in data) {
        const fixtures = (data as { data: unknown[] }).data || [];
        const foundFixture = fixtures.find(
          (fixture: unknown) =>
            (fixture as { slug?: string; _id?: string }).slug === idOrSlug ||
            (fixture as { slug?: string; _id?: string })._id === idOrSlug
        );
        if (foundFixture) {
          console.log(
            "🔍 Found fixture in league-fixtures cache:",
            foundFixture
          );
          return foundFixture;
        }
      }
    }

    // חיפוש גם ב-queries של משחקים כלליים
    const generalQueries = queryClient.getQueriesData({
      queryKey: ["fixtures"],
    });
    for (const [, data] of generalQueries) {
      if (data && typeof data === "object" && "data" in data) {
        const fixtures = (data as { data: unknown[] }).data || [];
        const foundFixture = fixtures.find(
          (fixture: unknown) =>
            (fixture as { slug?: string; _id?: string }).slug === idOrSlug ||
            (fixture as { slug?: string; _id?: string })._id === idOrSlug
        );
        if (foundFixture) {
          console.log("🔍 Found fixture in fixtures cache:", foundFixture);
          return foundFixture;
        }
      }
    }

    // חיפוש בכל ה-queries של football-events
    const footballEventQueries = queryClient.getQueriesData({
      queryKey: ["football-events"],
    });
    for (const [, data] of footballEventQueries) {
      if (data && typeof data === "object" && "data" in data) {
        const fixtures = (data as { data: unknown[] }).data || [];
        const foundFixture = fixtures.find(
          (fixture: unknown) =>
            (fixture as { slug?: string; _id?: string }).slug === idOrSlug ||
            (fixture as { slug?: string; _id?: string })._id === idOrSlug
        );
        if (foundFixture) {
          console.log(
            "🔍 Found fixture in football-events cache:",
            foundFixture
          );
          return foundFixture;
        }
      }
    }

    // חיפוש בכל ה-queries של team fixtures
    const teamFixtureQueries = queryClient.getQueriesData({
      queryKey: ["team-fixtures"],
    });
    for (const [, data] of teamFixtureQueries) {
      if (data && typeof data === "object" && "data" in data) {
        const fixtures = (data as { data: unknown[] }).data || [];
        const foundFixture = fixtures.find(
          (fixture: unknown) =>
            (fixture as { slug?: string; _id?: string }).slug === idOrSlug ||
            (fixture as { slug?: string; _id?: string })._id === idOrSlug
        );
        if (foundFixture) {
          console.log("🔍 Found fixture in team-fixtures cache:", foundFixture);
          return foundFixture;
        }
      }
    }

    console.log("🔍 No fixture found in cache for idOrSlug:", idOrSlug);
    return null;
  }, [idOrSlug, queryClient]);

  // נשתמש במשחק מהקאש או נשלוף מהשרת
  const finalFixtureId = fixtureId;

  // אם לא מצאנו בקאש אבל יש ID, נשלוף מהשרת
  const {
    fixture: serverFixture,
    isLoading: fixtureLoading,
    error: fixtureError,
  } = useFixture(finalFixtureId || "", {
    enabled: !cachedFixture && !!finalFixtureId,
  });

  const finalFixture = cachedFixture || serverFixture;

  // אם אין ID, לא נשלוף הצעות
  const {
    offers,
    isLoading: offersLoading,
    error: offersError,
    total,
  } = useOffersByFixture(
    finalFixtureId || "",
    {
      page: 1,
      limit: 50,
      sortBy: "price",
      sortOrder: "asc",
    },
    {
      enabled: !!finalFixtureId, // רק אם יש ID של משחק
    }
  );

  // לוג לדיבוג
  console.log("🔍 useFixtureWithOffers Return:", {
    idOrSlug,
    fixtureId,
    cachedFixture,
    offers,
    offersLength: offers?.length,
    offersLoading,
    offersError,
    total,
    offersType: typeof offers,
    offersIsArray: Array.isArray(offers),
  });

  return {
    fixture: finalFixture, // נחזיר את המשחק מהקאש או מהשרת
    fixtureLoading: fixtureLoading,
    fixtureError:
      fixtureError ||
      (finalFixture ? null : `משחק "${idOrSlug}" לא נמצא במערכת`),
    offers,
    offersLoading,
    offersError,
    total,
    fixtureId: finalFixtureId, // נחזיר את ה-ID לשימוש חיצוני
  };
}
