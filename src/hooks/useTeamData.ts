import { useMemo, useState, useEffect } from "react";
import { useUpcomingTeamFixtures } from "./useTeamFixtures";
import { Team, Fixture } from "@/types";

interface UseTeamDataResult {
  team: Team | null;
  isLoading: boolean;
  error: string | null;
  fixtures: Fixture[] | null;
  teamLoading: boolean;
  fixturesLoading: boolean;
  teamError: string | null;
  fixturesError: string | null;
}

export function useTeamData(teamObjectId: string): UseTeamDataResult {
  // teamObjectId is now the MongoDB ObjectID passed from the parent component
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(teamObjectId);

  console.log("🔍 useTeamData called with:", {
    teamObjectId,
    isValidObjectId,
  });

  // Fetch fixtures data only if we have a valid ObjectID
  const {
    fixtures: upcomingFixtures,
    isLoading: fixturesLoading,
    error: fixturesError,
  } = useUpcomingTeamFixtures(teamObjectId, 10, isValidObjectId);

  // Extract team data from fixtures (no API call needed)
  const team = useMemo(() => {
    // Extract team info from first fixture
    if (upcomingFixtures && upcomingFixtures.length > 0) {
      const firstFixture = upcomingFixtures[0];
      console.log("🔍 useTeamData: First fixture:", firstFixture);

      // Check if the team is home or away team by ObjectID
      const isHomeTeam =
        (firstFixture.homeTeam._id || firstFixture.homeTeam.id) ===
        teamObjectId;
      const teamFromFixture = isHomeTeam
        ? firstFixture.homeTeam
        : firstFixture.awayTeam;

      console.log(
        "✅ useTeamData: Extracted team from fixture:",
        teamFromFixture
      );

      // Convert to Team interface format
      return {
        id: teamFromFixture._id || teamFromFixture.id,
        name: teamFromFixture.name,
        slug: teamFromFixture.slug,
        logo: teamFromFixture.logo || teamFromFixture.logoUrl,
        country: firstFixture.league.country,
        city: teamFromFixture.city || "Unknown",
        stadium: firstFixture.venue?.name || "Unknown",
      };
    }

    return null;
  }, [upcomingFixtures, teamObjectId]);

  // Determine loading state - we're loading if fixtures are loading
  const isLoading = fixturesLoading;

  // Determine error state - only show error if we don't have fixtures
  const error = fixturesError || null;

  console.log("✅ useTeamData: State:", {
    teamObjectId,
    team,
    upcomingFixtures,
    fixturesLoading,
    fixturesError,
    isLoading,
    error,
  });

  return {
    team,
    fixtures: upcomingFixtures,
    teamLoading: false, // No longer loading team data separately
    fixturesLoading,
    isLoading,
    error,
    teamError: null, // No team error since we're not calling team API
    fixturesError: fixturesError || null,
  };
}
