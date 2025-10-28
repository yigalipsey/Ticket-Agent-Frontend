"use client";

import React from "react";
import { MonthFilter, VenueFilter } from "@/components/filters";

interface LeagueFilterProps {
  selectedMonth: string | null;
  selectedVenue: string | null;
  availableMonths: string[];
  availableVenues: Array<{ _id: string; name: string; nameHe?: string }>;
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
    <div className="bg-white rounded-lg p-4 mb-6 relative z-50">
      <div className="flex flex-row gap-3 items-center flex-wrap">
        <VenueFilter
          selectedVenue={selectedVenue}
          availableVenues={availableVenues}
          onVenueChange={onVenueChange}
          label="אצטדיון"
        />
        <MonthFilter
          selectedMonth={selectedMonth}
          availableMonths={availableMonths}
          onMonthChange={onMonthChange}
          label="חודש"
        />
        {onReset && hasActiveFilters && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm whitespace-nowrap"
          >
            איפוס מסננים
          </button>
        )}
      </div>
    </div>
  );
}

export default LeagueFilter;
