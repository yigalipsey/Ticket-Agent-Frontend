"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface LeagueOption {
  _id: string;
  id?: string;
  name?: string;
  nameHe?: string;
  slug?: string;
}

interface TeamFixturesLeagueFilterProps {
  selectedLeague: string | null;
  availableLeagues: LeagueOption[];
  onLeagueChange: (leagueId: string | null) => void;
  label?: string;
}

/**
 * Team Fixtures League Filter - Filter team fixtures by league
 */
export function TeamFixturesLeagueFilter({
  selectedLeague,
  availableLeagues,
  onLeagueChange,
  label = "כל הליגות",
}: TeamFixturesLeagueFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLeagueLabel = selectedLeague
    ? (() => {
        const league = availableLeagues.find(
          (l) => (l._id || l.id) === selectedLeague
        );
        return league?.nameHe || league?.name || "ליגה לא ידועה";
      })()
    : label;

  return (
    <div className="relative w-full sm:w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-transparent border border-primary text-primary rounded-lg shadow-sm hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <span className="text-sm font-medium truncate">
          {selectedLeagueLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform flex-shrink-0 mr-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-primary rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          <div className="py-1">
            <button
              onClick={() => {
                onLeagueChange(null);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 ${
                selectedLeague === null
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-900"
              }`}
            >
              {label}
            </button>
            {availableLeagues.map((league) => {
              const leagueId = league._id || league.id;
              return (
                <button
                  key={leagueId}
                  onClick={() => {
                    onLeagueChange(leagueId || null);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 whitespace-nowrap ${
                    selectedLeague === leagueId
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-900"
                  }`}
                >
                  {league.nameHe || league.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
