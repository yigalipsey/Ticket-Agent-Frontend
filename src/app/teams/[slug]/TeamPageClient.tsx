"use client";

import React, { useEffect, useState } from "react";
import { TeamHeader, TeamHeaderLoading } from "@/components/team/TeamHeader";
import { navigationService } from "@/services/navigationService";

interface Team {
  id?: string;
  _id?: string;
  name: string;
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
  showComparisonText?: boolean; // האם להציג את הטקסט "השוואת מחירים למשחקי..."
}

export default function TeamPageClient({
  slug,
  teamId,
  fallbackName,
  fallbackLogo,
  showComparisonText = true, // ברירת מחדל: true (ליוזר רגיל)
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

  return <TeamHeader team={team} showComparisonText={showComparisonText} />;
}
