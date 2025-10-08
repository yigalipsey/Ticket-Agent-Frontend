"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

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
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isVenueOpen, setIsVenueOpen] = useState(false);

  const selectedMonthLabel = selectedMonth
    ? new Date(selectedMonth).toLocaleDateString("he-IL", {
        month: "long",
        year: "numeric",
      })
    : "כל החודשים";

  const selectedVenueLabel = selectedVenue
    ? availableVenues.find((v) => v._id === selectedVenue)?.nameHe ||
      availableVenues.find((v) => v._id === selectedVenue)?.name ||
      "אצטדיון לא ידוע"
    : "כל האצטדיונים";

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* פילטר חודש */}
      <div className="relative sm:w-48">
        <button
          onClick={() => {
            setIsMonthOpen(!isMonthOpen);
            setIsVenueOpen(false);
          }}
          className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <span className="text-sm font-medium text-gray-700">
            {selectedMonthLabel}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isMonthOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isMonthOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <div className="py-1">
              <button
                onClick={() => {
                  onMonthChange(null);
                  setIsMonthOpen(false);
                }}
                className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 ${
                  selectedMonth === null
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                כל החודשים
              </button>
              {availableMonths.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    onMonthChange(month);
                    setIsMonthOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 ${
                    selectedMonth === month
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {new Date(month).toLocaleDateString("he-IL", {
                    month: "long",
                    year: "numeric",
                  })}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* פילטר אצטדיון */}
      <div className="relative sm:w-80">
        <button
          onClick={() => {
            setIsVenueOpen(!isVenueOpen);
            setIsMonthOpen(false);
          }}
          className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <span className="text-sm font-medium text-gray-700 truncate">
            {selectedVenueLabel}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform flex-shrink-0 mr-2 ${
              isVenueOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isVenueOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
            <div className="py-1">
              <button
                onClick={() => {
                  onVenueChange(null);
                  setIsVenueOpen(false);
                }}
                className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 ${
                  selectedVenue === null
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                כל האצטדיונים
              </button>
              {availableVenues.map((venue) => (
                <button
                  key={venue._id}
                  onClick={() => {
                    onVenueChange(venue._id);
                    setIsVenueOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 whitespace-nowrap ${
                    selectedVenue === venue._id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {venue.nameHe || venue.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeagueFilter;
