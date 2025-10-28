"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MonthFilterProps {
  selectedMonth: string | null;
  availableMonths: string[];
  onMonthChange: (month: string | null) => void;
  label?: string;
}

export function MonthFilter({
  selectedMonth,
  availableMonths,
  onMonthChange,
  label = "כל החודשים",
}: MonthFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedMonthLabel = selectedMonth
    ? new Date(selectedMonth).toLocaleDateString("he-IL", {
        month: "long",
        year: "numeric",
      })
    : label;

  return (
    <div className="relative w-full sm:w-48">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-primary rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <span className="text-sm font-medium text-primary">
          {selectedMonthLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-primary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 sm:right-0 sm:w-auto w-full min-w-full mt-1 bg-white shadow-lg rounded-lg z-[100]">
          <div className="py-1">
            <button
              onClick={() => {
                onMonthChange(null);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-right text-sm hover:bg-gray-50 ${
                selectedMonth === null
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {label}
            </button>
            {availableMonths.map((month) => (
              <button
                key={month}
                onClick={() => {
                  onMonthChange(month);
                  setIsOpen(false);
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
  );
}
