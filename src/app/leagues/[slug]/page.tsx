"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import {
  useLeagueFixtures,
  useUpcomingLeagueFixtures,
  useTeamsByLeague,
} from "@/hooks";
import {
  FixtureCard,
  InfiniteFixturesList,
  Spinner,
  LeagueTeamsCarousel,
} from "@/components";
import Image from "next/image";
import { Fixture } from "@/types";
import { LeagueService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function LeaguePage() {
  const t = useTranslations();
  const params = useParams();
  const locale = useLocale();
  const leagueSlug = params.slug as string;

  const [activeTab, setActiveTab] = useState<"upcoming" | "all">("upcoming");

  // קבלת פרטי הליגה מהבקאנד - רק לפי ObjectID!
  // נשתמש בכל הליגות כדי למצוא את ה-ObjectID
  const { data: allLeagues } = useQuery({
    queryKey: ["all-leagues-for-routing"],
    queryFn: () => LeagueService.getAllAvailableLeagues(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const leagueObjectId = allLeagues?.find((l) => l.slug === leagueSlug)?._id;

  const { data: apiLeague, isLoading: leagueApiLoading } = useQuery({
    queryKey: ["league-by-id", leagueObjectId],
    queryFn: () => {
      console.log("🔍 Fetching league by ObjectID:", leagueObjectId);
      return LeagueService.getLeague(leagueObjectId!);
    },
    enabled: !!leagueObjectId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // שימוש ב-ObjectID - רק ObjectID!
  const leagueId = leagueObjectId;
  const league = apiLeague; // Use the league from API

  // שליפת משחקים קרובים (אוטומטית)
  const { fixtures: upcomingFixtures, isLoading: upcomingLoading } =
    useUpcomingLeagueFixtures(leagueId!, 10, true, locale);

  console.log("🎯 League page upcomingFixtures:", {
    upcomingFixtures,
    upcomingLoading,
    count: upcomingFixtures?.length || 0,
  });

  // שליפת כל המשחקים (רק כשמבקשים)
  const {
    fixtures: allFixtures,
    isLoading: allLoading,
    triggerFetch: fetchAll,
  } = useLeagueFixtures(leagueId!, {
    autoFetch: false,
    locale,
  });

  // שליפת קבוצות הליגה
  const { teams, isLoading: teamsLoading } = useTeamsByLeague(
    leagueId!,
    locale
  );

  // Debug logs
  console.log("League page debug:", {
    leagueSlug,
    leagueId,
    teams,
    teamsLoading,
    teamsCount: teams?.length,
  });

  if (!league) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ליגה לא נמצאה
            </h1>
            <p className="text-gray-600">הליגה המבוקשת לא קיימת במערכת</p>
          </div>
        </div>
      </div>
    );
  }

  const handleTabChange = (tab: "upcoming" | "all") => {
    setActiveTab(tab);

    // שליפה חכמה - רק כשצריך
    switch (tab) {
      case "all":
        if (allFixtures.length === 0) {
          fetchAll();
        }
        break;
    }
  };

  const getCurrentFixtures = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingFixtures;
      case "all":
        return allFixtures;
      default:
        return [];
    }
  };

  const getCurrentLoading = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingLoading;
      case "all":
        return allLoading;
      default:
        return false;
    }
  };

  const fixtures = getCurrentFixtures();
  const isLoading = getCurrentLoading() || leagueApiLoading;

  // אם הליגה לא נטענה עדיין או לא נמצאה
  if (leagueApiLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!leagueObjectId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ליגה לא נמצאה
          </h1>
          <p className="text-gray-600">הליגה {leagueSlug} לא קיימת במערכת</p>
        </div>
      </div>
    );
  }

  if (!league) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            טוען ליגה...
          </h1>
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
              {league.logoUrl && (
                <Image
                  src={league.logoUrl}
                  alt={league.nameHe}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              )}
              <h1 className="text-4xl font-bold text-gray-900">
                {league.nameHe}
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              {league.countryHe} • {league.type}
            </p>
          </div>
        </div>
      </div>

      {/* Teams Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeagueTeamsCarousel
          teams={teams}
          leagueSlug={leagueSlug}
          isLoading={teamsLoading}
          className="mb-8"
        />
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange("upcoming")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {t("leagues.upcomingMatches")}
            </button>
            <button
              onClick={() => handleTabChange("all")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {t("leagues.allMatches")}
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="py-8">
          {activeTab === "upcoming" ? (
            // Show upcoming fixtures with regular pagination
            isLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : fixtures.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {t("leagues.noUpcomingMatches")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {fixtures.map((fixture: Fixture, index: number) => (
                  <FixtureCard
                    key={fixture.id || `fixture-${activeTab}-${index}`}
                    fixture={fixture}
                    showOffers={true}
                    showVenue={true}
                    showLeague={false} // כבר אנחנו בדף הליגה
                  />
                ))}
              </div>
            )
          ) : (
            // Show all fixtures with infinite scroll
            <InfiniteFixturesList
              leagueId={leagueId!}
              locale={locale}
              className=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
