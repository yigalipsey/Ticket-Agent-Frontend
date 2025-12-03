"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedMonthLabel = selectedMonth
    ? new Date(selectedMonth).toLocaleDateString("he-IL", {
        month: "long",
        year: "numeric",
      })
    : label;

  return (
    <div className="relative w-full md:w-auto" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between px-4 py-2 border rounded-full transition-all duration-200 whitespace-nowrap w-full md:min-w-[160px]",
          isOpen
            ? "border-primary ring-1 ring-primary/10 bg-white shadow-sm"
            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50 text-gray-700"
        )}
      >
        <span className={cn("text-sm font-medium truncate", selectedMonth ? "text-primary" : "text-gray-700")}>
          {selectedMonthLabel}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform flex-shrink-0 ml-2 text-gray-400",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto w-full md:min-w-[220px] md:w-auto p-1 animate-in fade-in zoom-in-95 duration-100">
          <button
            onClick={() => {
              onMonthChange(null);
              setIsOpen(false);
            }}
            className={cn(
              "w-full px-3 py-2.5 text-right text-sm rounded-lg flex items-center justify-between transition-colors",
              selectedMonth === null
                ? "bg-primary/5 text-primary font-medium"
                : "text-gray-700 hover:bg-gray-50"
            )}
          >
            <span>{label}</span>
            {selectedMonth === null && <Check className="h-4 w-4" />}
          </button>
          
          {availableMonths.map((month) => {
            const isSelected = selectedMonth === month;
            return (
              <button
                key={month}
                onClick={() => {
                  onMonthChange(month);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-2.5 text-right text-sm rounded-lg flex items-center justify-between transition-colors whitespace-nowrap",
                  isSelected
                    ? "bg-primary/5 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <span>
                  {new Date(month).toLocaleDateString("he-IL", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                {isSelected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
