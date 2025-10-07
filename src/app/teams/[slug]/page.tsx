"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import React from "react";
import { TeamHero, TeamFixtures, TeamFilters } from "@/components";
import { Spinner } from "@/components/ui";
import { useTeamData } from "@/hooks";
import { navigationService } from "@/services/navigationService";

export default function TeamPage() {
  const { slug: teamSlug } = useParams();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "home" | "away">(
    "all"
  );
  const [selectedRound, setSelectedRound] = useState<string>("");

  // הוק יחיד שמטפל בכל הלוגיקה של טעינת דאטה
  const { teamId, fixtures, isLoading, error } = useTeamData(
    teamSlug as string,
    {
      limit: 50,
      upcoming: "true",
    }
  );

  // חילוץ פרטי הקבוצה מהנתונים המאוחסנים
  const teamData = React.useMemo(() => {
    // קודם ננסה למצוא את פרטי הקבוצה מהנתונים המאוחסנים
    if (navigationService.isInitialized()) {
      const teamInfo = navigationService.getTeamBySlug(teamSlug as string);
      if (teamInfo) {
        return {
          id: teamId,
          name: teamInfo.name,
          logo: (teamInfo as any).logo, // לקבל את הלוגו מהנתונים המאוחסנים
        };
      }
    }

    // אם לא מצאנו, נקח מהמשחקים
    if (fixtures && fixtures.length > 0) {
      return {
        id: teamId,
        name:
          fixtures[0].homeTeam?.name || fixtures[0].awayTeam?.name || "הקבוצה",
        logo:
          fixtures[0].homeTeam?.logo ||
          fixtures[0].awayTeam?.logo ||
          fixtures[0].homeTeam?.logoUrl ||
          fixtures[0].awayTeam?.logoUrl,
      };
    }

    return null;
  }, [teamId, teamSlug, fixtures]);

  const team = teamData;

  // מצב טעינה
  if (isLoading && !teamId) {
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

  // מצב שגיאה
  if (error && (!fixtures || fixtures.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            קבוצה לא נמצאה
          </h1>
          <p className="text-gray-600">
            הקבוצה &quot;{teamSlug}&quot; לא קיימת במערכת או שאין לה משחקים
          </p>
          {error && (
            <p className="text-red-600 text-sm mt-2">{error.message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* כותרת הקבוצה */}
      <TeamHero team={team as any} />

      {/* פילטרים */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <TeamFilters
          fixtures={(fixtures || []) as any}
          teamId={teamId || ""}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedRound={selectedRound}
          setSelectedRound={setSelectedRound}
        />
      </div>

      {/* משחקי הקבוצה */}
      <TeamFixtures
        fixtures={fixtures as any}
        isLoading={isLoading}
        error={error?.message || null}
        teamName={team?.name || "הקבוצה"}
      />
    </div>
  );
}
