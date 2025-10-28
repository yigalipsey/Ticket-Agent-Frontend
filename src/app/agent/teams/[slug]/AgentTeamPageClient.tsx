"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/providers";
import { Fixture } from "@/types/fixture";
import TeamPageClient from "@/app/teams/[slug]/TeamPageClient";
import AgentTeamFixtures from "./AgentTeamFixtures";

interface AgentTeamPageClientProps {
  slug: string;
  teamId: string | null;
  fallbackName?: string;
  fallbackLogo?: string;
  initialFixtures: Fixture[];
}

export default function AgentTeamPageClient({
  slug,
  teamId,
  fallbackName,
  fallbackLogo,
  initialFixtures,
}: AgentTeamPageClientProps) {
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
      {/* כותרת הקבוצה - full width */}
      <TeamPageClient
        slug={slug}
        teamId={teamId}
        fallbackName={fallbackName}
        fallbackLogo={fallbackLogo}
        showComparisonText={false}
      />

      {/* Back button + משחקים - with container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* משחקים עם טופס הצעה - רכיב מותאם לסוכן */}
        <AgentTeamFixtures
          teamId={teamId}
          teamSlug={slug}
          initialFixtures={initialFixtures}
        />
      </div>
    </>
  );
}
