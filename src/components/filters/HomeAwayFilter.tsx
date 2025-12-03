"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type HomeAwayFilterType = "all" | "home" | "away";

interface HomeAwayFilterProps {
  selectedFilter: HomeAwayFilterType;
  onFilterChange: (filter: HomeAwayFilterType) => void;
  labels?: {
    all?: string;
    home?: string;
    away?: string;
  };
  className?: string;
  fullWidth?: boolean;
}

export function HomeAwayFilter({
  selectedFilter,
  onFilterChange,
  labels = {
    all: "כל המשחקים",
    home: "משחקי בית",
    away: "משחקי חוץ",
  },
  className,
  fullWidth = false,
}: HomeAwayFilterProps) {
  return (
    <div 
      className={cn(
        "inline-flex p-1 bg-gray-100/80 rounded-full border border-gray-200",
        fullWidth && "flex w-full",
        className
      )}
    >
      <button
        onClick={() => onFilterChange("all")}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
          fullWidth && "flex-1 text-center justify-center",
          selectedFilter === "all"
            ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
        )}
      >
        {labels.all}
      </button>

      <button
        onClick={() => onFilterChange("home")}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
          fullWidth && "flex-1 text-center justify-center",
          selectedFilter === "home"
            ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
        )}
      >
        {labels.home}
      </button>

      <button
        onClick={() => onFilterChange("away")}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
          fullWidth && "flex-1 text-center justify-center",
          selectedFilter === "away"
            ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
        )}
      >
        {labels.away}
      </button>
    </div>
  );
}
