"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface VenueFilterProps {
  selectedVenue: string | null;
  availableVenues: Array<{ _id: string; name: string }>;
  onVenueChange: (venueId: string | null) => void;
  label?: string;
}

export function VenueFilter({
  selectedVenue,
  availableVenues,
  onVenueChange,
  label = "כל האצטדיונים",
}: VenueFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedVenueLabel = selectedVenue
    ? availableVenues.find((v) => v._id === selectedVenue)?.name ||
      "אצטדיון לא ידוע"
    : label;

  return (
    <div className="relative w-auto sm:w-80">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-primary rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <span className="text-sm font-medium text-primary truncate">
          {selectedVenueLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-primary transition-transform flex-shrink-0 mr-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 sm:right-0 sm:w-auto w-auto min-w-full mt-1 bg-white shadow-lg rounded-lg z-[100] max-h-64 overflow-y-auto">
          <div className="py-1">
            <button
              onClick={() => {
                onVenueChange(null);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 ${
                selectedVenue === null
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {label}
            </button>
            {availableVenues.map((venue) => (
              <button
                key={venue._id}
                onClick={() => {
                  onVenueChange(venue._id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 whitespace-nowrap ${
                  selectedVenue === venue._id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {venue.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
