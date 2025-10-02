"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { TeamCard } from "@/components";
import { usePopularTeams } from "@/hooks";
import { Spinner } from "@/components/ui";

export default function TeamsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { teams, isLoading, error } = usePopularTeams(20, locale);

  if (error) {
    return (
      <div className="min-h-screen bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {t("errors.loadingError")}
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-dark mb-4">
              {t("teams.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              גלו את כל הקבוצות המובילות והמשחקים המרתקים ביותר מכל העולם
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                showDescription={true}
                showStats={true}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
