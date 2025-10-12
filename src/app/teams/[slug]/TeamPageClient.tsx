"use client";

import React, { useEffect, useState } from "react";
import { TeamHeader, TeamHeaderLoading } from "@/components/team/TeamHeader";
import { navigationService } from "@/services/navigationService";

interface Team {
  id?: string;
  _id?: string;
  name: string;
  nameHe?: string;
  logo?: string;
  logoUrl?: string;
  city?: string;
  country?: string;
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

  useEffect(() => {
    async function loadTeam() {
      setIsLoading(true);

      try {
        // Try to get team from navigationService first (uses cache)
        const teamFromNav = navigationService.getTeamBySlug(slug);
        if (teamFromNav) {
          setTeam({
            id: teamFromNav.id,
            name: teamFromNav.name,
            logo: fallbackLogo,
            logoUrl: fallbackLogo,
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

  return <TeamHeader team={team} />;
}
