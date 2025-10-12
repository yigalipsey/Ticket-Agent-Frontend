"use client";

import React from "react";

export type HomeAwayFilterType = "all" | "home" | "away";

interface HomeAwayFilterProps {
  selectedFilter: HomeAwayFilterType;
  onFilterChange: (filter: HomeAwayFilterType) => void;
  labels?: {
    all?: string;
    home?: string;
    away?: string;
  };
}

export function HomeAwayFilter({
  selectedFilter,
  onFilterChange,
  labels = {
    all: "כל המשחקים",
    home: "משחקי בית",
    away: "משחקי חוץ",
  },
}: HomeAwayFilterProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedFilter === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {labels.all}
      </button>

      <button
        onClick={() => onFilterChange("home")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedFilter === "home"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {labels.home}
      </button>

      <button
        onClick={() => onFilterChange("away")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedFilter === "away"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {labels.away}
      </button>
    </div>
  );
}
