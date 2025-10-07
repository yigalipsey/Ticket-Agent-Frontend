"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import HotFixturesSection from "@/components/home/HotFixturesSection";
import { Fixture } from "@/types/fixture";
import { saveToLocalStorage } from "@/lib/utils";

interface HotFixturesPrefetchProps {
  initialFixtures?: Fixture[];
}

const STORAGE_KEY = "hot-fixtures";

/**
 * Component להזרקת המשחקים החמים ל-React Query cache + localStorage
 * מקבל initialFixtures מ-SSR ושומר ב-cache וב-localStorage
 */
export default function HotFixturesPrefetch({
  initialFixtures,
}: HotFixturesPrefetchProps) {
  const queryClient = useQueryClient();

  // הזרקת המשחקים ל-cache + localStorage
  useEffect(() => {
    if (initialFixtures && initialFixtures.length > 0) {
      // שמירה ב-React Query cache
      queryClient.setQueryData(["hot-fixtures"], initialFixtures);

      // שמירה ב-localStorage עם מפתח נפרד
      saveToLocalStorage(initialFixtures, STORAGE_KEY);

      console.log(
        "✅ [HotFixturesPrefetch] Saved",
        initialFixtures.length,
        "fixtures to cache & localStorage"
      );
    }
  }, [initialFixtures, queryClient]);

  return <HotFixturesSection />;
}
