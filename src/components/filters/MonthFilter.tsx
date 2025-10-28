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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 bg-white border border-primary rounded-lg hover:bg-gray-50 focus:outline-none whitespace-nowrap"
      >
        <span className="text-sm font-medium text-primary">
          {selectedMonthLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-primary transition-transform ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-primary rounded-lg z-10 min-w-[200px]">
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
