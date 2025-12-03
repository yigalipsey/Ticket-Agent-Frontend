"use client";

import React from "react";
import { MonthFilter, VenueFilter } from "@/components/filters";

interface LeagueFilterProps {
  selectedMonth: string | null;
  selectedVenue: string | null;
  availableMonths: string[];
  availableVenues: Array<{ _id: string; name: string }>;
  onMonthChange: (month: string | null) => void;
  onVenueChange: (venueId: string | null) => void;
  onReset?: () => void;
}

export function LeagueFilter({
  selectedMonth,
  selectedVenue,
  availableMonths,
  availableVenues,
  onMonthChange,
  onVenueChange,
  onReset,
}: LeagueFilterProps) {
  const hasActiveFilters = selectedMonth !== null || selectedVenue !== null;

  const handleReset = () => {
    onMonthChange(null);
    onVenueChange(null);
    onReset?.();
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:flex md:flex-row gap-3 items-start md:items-center w-full">
        <VenueFilter
          selectedVenue={selectedVenue}
          availableVenues={availableVenues}
          onVenueChange={onVenueChange}
          label="כל האצטדיונים"
        />
        <MonthFilter
          selectedMonth={selectedMonth}
          availableMonths={availableMonths}
          onMonthChange={onMonthChange}
          label="כל החודשים"
        />
        {onReset && hasActiveFilters && (
          <button
            onClick={handleReset}
            className="col-span-2 md:col-span-1 w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap"
          >
            איפוס מסננים
          </button>
        )}
      </div>
    </div>
  );
}

export default LeagueFilter;
