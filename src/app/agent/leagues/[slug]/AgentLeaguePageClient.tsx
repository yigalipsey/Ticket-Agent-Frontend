"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/hooks";
import { Fixture } from "@/types/fixture";
import LeaguePageClient from "@/app/leagues/[slug]/LeaguePageClient";
import AgentLeagueFixtures from "./AgentLeagueFixtures";

interface AgentLeaguePageClientProps {
  slug: string;
  leagueId: string | null;
  initialFixtures: Fixture[];
}

export default function AgentLeaguePageClient({
  slug,
  leagueId,
  initialFixtures,
}: AgentLeaguePageClientProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAgentAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/agent/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Back button */}
      <button
        onClick={() => router.push("/agent/dashboard")}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <svg
          className="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        חזרה לדשבורד
      </button>

      {/* כותרת הליגה + קבוצות - משתמש ברכיב הקיים */}
      <LeaguePageClient slug={slug} leagueId={leagueId} />

      {/* משחקים עם טופס הצעה - רכיב מותאם לסוכן */}
      <AgentLeagueFixtures
        leagueId={leagueId}
        leagueSlug={slug}
        initialFixtures={initialFixtures}
      />
    </>
  );
}
