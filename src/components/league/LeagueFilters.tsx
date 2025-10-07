"use client";

import React, { useState, useEffect } from "react";

interface LeagueFiltersProps {
  onFiltersChange: (filters: {
    month?: string;
    months?: string[];
    city?: string;
    hasOffers?: boolean;
  }) => void;
  initialFilters?: {
    month?: string;
    months?: string[];
    city?: string;
    hasOffers?: boolean;
  };
  isLoading?: boolean;
}

export function LeagueFilters({
  onFiltersChange,
  initialFilters = {},
  isLoading = false,
}: LeagueFiltersProps) {
  const [filters, setFilters] = useState({
    month: initialFilters.month || "all", // Default to "all" (show upcoming fixtures)
    months: initialFilters.months || [],
    city: initialFilters.city || "",
    hasOffers: initialFilters.hasOffers || false,
  });

  // Generate months from October 2025 to May 2026
  const generateMonths = () => {
    const months = [
      {
        value: "all",
        label: "כל המשחקים הקרובים",
      },
    ];

    // October 2025 to May 2026
    const startYear = 2025;
    const startMonth = 9; // October (0-based)
    const endYear = 2026;
    const endMonth = 4; // May (0-based)

    let year = startYear;
    let month = startMonth;

    while (year < endYear || (year === endYear && month <= endMonth)) {
      const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
      const monthName = new Date(year, month).toLocaleDateString("he-IL", {
        year: "numeric",
        month: "long",
      });

      months.push({
        value: monthStr,
        label: monthName,
      });

      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }

    return months;
  };

  const months = generateMonths();

  // Common cities for football matches
  const cities = [
    "לונדון",
    "מנצ'סטר",
    "ליברפול",
    "בירמינגהאם",
    "ניוקאסל",
    "ברייטון",
    "וולברהמפטון",
    "נוטינגהאם",
    "לוטון",
    "ברנלי",
    "שפילד",
    "בורנמות'",
    "מדריד",
    "ברצלונה",
    "ולנסיה",
    "סביליה",
    "בילבאו",
    "מלאגה",
    "לאס פאלמס",
    "סנטיאגו דה קומפוסטלה",
  ];

  // Update filters when initialFilters change (only if they're actually different)
  useEffect(() => {
    const newFilters = {
      month: initialFilters.month || "",
      months: initialFilters.months || [],
      city: initialFilters.city || "",
      hasOffers: initialFilters.hasOffers || false,
    };

    // Only update if filters are actually different
    setFilters((prevFilters) => {
      if (
        newFilters.month !== prevFilters.month ||
        JSON.stringify(newFilters.months) !==
          JSON.stringify(prevFilters.months) ||
        newFilters.city !== prevFilters.city ||
        newFilters.hasOffers !== prevFilters.hasOffers
      ) {
        return newFilters;
      }
      return prevFilters;
    });
  }, [
    initialFilters.month,
    initialFilters.months,
    initialFilters.city,
    initialFilters.hasOffers,
  ]);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      month: "all", // Reset to "all" (show upcoming fixtures)
      months: [],
      city: "",
      hasOffers: false,
    });
  };

  const hasActiveFilters =
    (filters.month && filters.month !== "all") ||
    filters.city ||
    filters.hasOffers;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">סינון משחקים</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            disabled={isLoading}
          >
            נקה סינונים
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Month Filter */}
        <div>
          <label
            htmlFor="month-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            חודש
          </label>
          <select
            id="month-filter"
            value={filters.month}
            onChange={(e) => handleFilterChange("month", e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">כל החודשים</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div>
          <label
            htmlFor="city-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            עיר
          </label>
          <select
            id="city-filter"
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">כל הערים</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Has Offers Filter */}
        <div className="flex items-center">
          <div className="flex items-center h-5">
            <input
              id="has-offers-filter"
              type="checkbox"
              checked={filters.hasOffers}
              onChange={(e) =>
                handleFilterChange("hasOffers", e.target.checked)
              }
              disabled={isLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:bg-gray-100"
            />
          </div>
          <label
            htmlFor="has-offers-filter"
            className="mr-2 text-sm font-medium text-gray-700"
          >
            רק משחקים עם הצעות
          </label>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600">
              סינונים פעילים:
            </span>
            {filters.month && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                חודש: {months.find((m) => m.value === filters.month)?.label}
              </span>
            )}
            {filters.city && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                עיר: {filters.city}
              </span>
            )}
            {filters.hasOffers && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                עם הצעות
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
