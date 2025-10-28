"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TeamHeader, TeamHeaderLoading } from "@/components/team/TeamHeader";
import { TeamHero } from "@/components/team/TeamHero";
import { navigationService } from "@/services/navigationService";
import LeagueService from "@/services/leagueService";
import { League } from "@/types/league";

interface Team {
  id?: string;
  _id?: string;
  name: string;
  nameHe?: string;
  logo?: string;
  logoUrl?: string;
  city?: string;
  country?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

interface TeamPageClientProps {
  slug: string;
  teamId: string | null;
  fallbackName?: string;
  fallbackLogo?: string;
}

export default function TeamPageClient({
  slug,
  teamId,
  fallbackName,
  fallbackLogo,
}: TeamPageClientProps) {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    async function loadTeam() {
      setIsLoading(true);

      try {
        // Initialize navigationService from cache if not initialized
        if (!navigationService.isInitialized()) {
          const cachedLeagues = queryClient.getQueryData([
            "all-leagues-with-teams",
          ]);
          if (cachedLeagues) {
            navigationService.init(cachedLeagues as League[]);
          } else {
            // Try to fetch leagues if not in cache
            const result = await LeagueService.getAllLeaguesWithTeams();
            if (result.success && result.data) {
              queryClient.setQueryData(["all-leagues-with-teams"], result.data);
              navigationService.init(result.data);
            }
          }
        }

        // Try to get team from navigationService first (uses cache)
        const teamFromNav = navigationService.getTeamBySlug(slug);
        if (teamFromNav) {
          console.log("🎨 Team colors from navigationService:", {
            name: teamFromNav.name,
            primaryColor: teamFromNav.primaryColor,
            secondaryColor: teamFromNav.secondaryColor,
            fullData: teamFromNav,
          });

          setTeam({
            id: teamFromNav.id,
            name: teamFromNav.name,
            logo: fallbackLogo,
            logoUrl: fallbackLogo,
            primaryColor: teamFromNav.primaryColor,
            secondaryColor: teamFromNav.secondaryColor,
          });
        } else if (fallbackName) {
          // אם אין ב-cache אבל יש שם מהמשחקים
          setTeam({
            name: fallbackName,
            logo: fallbackLogo,
            logoUrl: fallbackLogo,
          });
        }
      } catch (error) {
        console.error("Error loading team:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, teamId, fallbackName, fallbackLogo]);

  if (isLoading) {
    return <TeamHeaderLoading />;
  }

  if (!team) {
    // גם אם אין נתונים, נציג לפחות את ה-slug
    return (
      <TeamHeader
        team={{
          name: slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        }}
      />
    );
  }

  return <TeamHero team={team} />;
}
