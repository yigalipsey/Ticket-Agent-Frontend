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
}

export function LeagueFilter({
  selectedMonth,
  selectedVenue,
  availableMonths,
  availableVenues,
  onMonthChange,
  onVenueChange,
}: LeagueFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <MonthFilter
        selectedMonth={selectedMonth}
        availableMonths={availableMonths}
        onMonthChange={onMonthChange}
        label="כל החודשים"
      />
      <VenueFilter
        selectedVenue={selectedVenue}
        availableVenues={availableVenues}
        onVenueChange={onVenueChange}
        label="כל האצטדיונים"
      />
    </div>
  );
}

export default LeagueFilter;
