"use client";

import React from "react";

export type FilterType = "all" | "home" | "away";

// Remove "round" from FilterType since round is independent

interface Fixture {
  _id: string;
  homeTeam: { _id: string; name: string };
  awayTeam: { _id: string; name: string };
  round: number;
  [key: string]: any;
}

interface TeamFiltersProps {
  fixtures: Fixture[];
  teamId: string;
  selectedFilter: "all" | "home" | "away";
  setSelectedFilter: (filter: "all" | "home" | "away") => void;
  selectedRound: string;
  setSelectedRound: (round: string) => void;
}

export function TeamFilters({
  fixtures,
  teamId,
  selectedFilter,
  setSelectedFilter,
  selectedRound,
  setSelectedRound,
}: TeamFiltersProps) {
  // חישוב מחזורים זמינים
  const availableRounds = React.useMemo(() => {
    if (!fixtures || fixtures.length === 0) return [];
    return Array.from(new Set(fixtures.map((f) => f.round).filter(Boolean)))
      .sort((a, b) => Number(a) - Number(b))
      .map(String);
  }, [fixtures]);

  // חישוב משחקים מסוננים לתצוגת הסטטוס
  const filteredCount = React.useMemo(() => {
    if (!fixtures || fixtures.length === 0 || !teamId) return 0;

    let filtered = fixtures;

    if (selectedFilter === "home") {
      filtered = filtered.filter(
        (f) => f.homeTeam?._id === teamId || f.homeTeam?.id === teamId
      );
    } else if (selectedFilter === "away") {
      filtered = filtered.filter(
        (f) => f.awayTeam?._id === teamId || f.awayTeam?.id === teamId
      );
    }

    if (selectedRound) {
      filtered = filtered.filter(
        (f) => f.round === selectedRound || f.round === Number(selectedRound)
      );
    }

    return filtered.length;
  }, [fixtures, teamId, selectedFilter, selectedRound]);
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">סינון משחקים</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* All Filter */}
        <button
          onClick={() => setSelectedFilter("all")}
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedFilter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          כל המשחקים
        </button>

        {/* Home Filter */}
        <button
          onClick={() => setSelectedFilter("home")}
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedFilter === "home"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          משחקי בית
        </button>

        {/* Away Filter */}
        <button
          onClick={() => setSelectedFilter("away")}
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedFilter === "away"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          משחקי חוץ
        </button>

        {/* Round Filter */}
        <select
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={availableRounds.length === 0}
        >
          <option value="">כל המחזורים</option>
          {availableRounds.map((round) => (
            <option key={round} value={round}>
              מחזור {round}
            </option>
          ))}
        </select>
      </div>

      {/* Current active filters */}
      {(selectedFilter !== "all" || selectedRound) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {selectedFilter !== "all" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedFilter === "home"
                  ? "משחקי בית"
                  : selectedFilter === "away"
                  ? "משחקי חוץ"
                  : ""}
              </span>
            )}
            {selectedRound && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                מחזור {selectedRound}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
