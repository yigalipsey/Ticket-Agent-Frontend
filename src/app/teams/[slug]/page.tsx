"use client";

import { useParams } from "next/navigation";
import { useTeamData } from "@/hooks";
import { TeamHero, TeamFixtures } from "@/components";
import { Spinner } from "@/components/ui";
import { useState, useEffect } from "react";
import { TeamService } from "@/services";

export default function TeamPage() {
  const params = useParams();
  const teamSlug = params.slug as string;
  const [teamObjectId, setTeamObjectId] = useState<string | null>(null);

  // Get ObjectID from slug by fetching all teams
  useEffect(() => {
    const fetchTeamId = async () => {
      if (teamSlug) {
        try {
          console.log("🔍 Fetching team ID for slug:", teamSlug);
          const teams = await TeamService.getAllAvailableTeams("he");
          const team = teams.find((t) => t.slug === teamSlug);
          if (team && (team._id || team.id)) {
            const id = team._id || team.id || "";
            setTeamObjectId(id);
            console.log("✅ Found team ObjectID:", id);
          } else {
            console.error("❌ Team not found for slug:", teamSlug);
          }
        } catch (error) {
          console.error("❌ Error fetching team ID:", error);
        }
      }
    };

    fetchTeamId();
  }, [teamSlug]);

  const { team, isLoading, error, fixtures, fixturesLoading, fixturesError } =
    useTeamData(teamObjectId || "");

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  // Error state - only show if we don't have team data AND no fixtures
  if (error && (!fixtures || fixtures.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              קבוצה לא נמצאה
            </h1>
            <p className="text-gray-600">
              {error || "אנא ודא שהכתובת נכונה או חזור לדף הקבוצות."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TeamHero team={team as any} />
      <TeamFixtures
        fixtures={fixtures as any}
        isLoading={fixturesLoading}
        error={fixturesError}
        teamName={team?.name}
      />
    </div>
  );
}
