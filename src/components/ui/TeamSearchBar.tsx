"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchTeams } from "@/hooks/search";
import { TeamWithFixtures, SearchFixture } from "@/services/searchService";

export interface TeamSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onTeamSelect?: (team: TeamWithFixtures) => void;
  onFixtureSelect?: (fixture: SearchFixture) => void;
  onClear?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  limit?: number;
  fixturesLimit?: number;
}

const TeamSearchBar: React.FC<TeamSearchBarProps> = ({
  placeholder = "חפש קבוצות...",
  value = "",
  onChange,
  onTeamSelect,
  onFixtureSelect,
  onClear,
  className,
  size = "md",
  disabled = false,
  limit = 10,
  fixturesLimit = 5,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    query,
    setQuery,
    searchResult,
    isLoading,
    error,
    search,
    clearSearch,
    hasResults,
    totalTeams,
    totalFixtures,
  } = useSearchTeams({
    limit,
    fixturesLimit,
  });

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 md:h-14 px-4 text-base",
    lg: "h-12 md:h-16 px-6 text-lg",
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      if (newValue.trim().length >= 3) {
        debounceTimeoutRef.current = setTimeout(() => {
          setQuery(newValue.trim());
          search(newValue.trim());
          setShowResults(true);
        }, 800);
      } else {
        setQuery("");
        setShowResults(false);
        onClear?.();
      }
    },
    [onChange, onClear, setQuery, search]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    setQuery("");
    clearSearch();
    setShowResults(false);
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  }, [onChange, onClear, setQuery, clearSearch]);

  const handleTeamSelect = useCallback(
    (team: TeamWithFixtures) => {
      onTeamSelect?.(team);
      setShowResults(false);
    },
    [onTeamSelect]
  );

  const handleFixtureSelect = useCallback(
    (fixture: SearchFixture) => {
      onFixtureSelect?.(fixture);
      setShowResults(false);
    },
    [onFixtureSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const allItems = searchResult?.teams || [];
      if (!showResults || allItems.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < allItems.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : allItems.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < allItems.length) {
            const item = allItems[focusedIndex];
            handleTeamSelect(item);
          }
          break;
        case "Escape":
          setShowResults(false);
          setFocusedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [showResults, searchResult, focusedIndex, handleTeamSelect]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("relative w-full z-[9999]", className)}>
      <form className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <button
              type="submit"
              disabled={disabled || isLoading}
              className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 md:py-3 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "block w-full pr-16 bg-transparent rounded-lg border-none focus:outline-none",
              "placeholder-gray-400 text-white",
              inputValue ? "pl-24" : "pl-4",
              sizes[size]
            )}
          />

          {inputValue && (
            <div className="absolute inset-y-0 left-0 pl-16 flex items-center">
              <button
                type="button"
                onClick={handleClear}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                aria-label="נקה חיפוש"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </form>

      {showResults && (
        <div
          ref={suggestionsRef}
          className="absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-auto mt-2 w-full"
        >
          {isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500 text-center">
              מחפש קבוצות...
            </div>
          )}

          {error && (
            <div className="px-4 py-2 text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {hasResults && (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b">
                תוצאות ({totalTeams} קבוצות, {totalFixtures} משחקים)
              </div>
              {searchResult?.teams.map((teamData, index) => (
                <div
                  key={teamData.team._id}
                  className="border-b last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => handleTeamSelect(teamData)}
                    className={cn(
                      "w-full px-4 py-3 text-right text-sm hover:bg-gray-50 focus:bg-gray-50",
                      focusedIndex === index && "bg-gray-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">
                          {teamData.team.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({teamData.team.code})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {teamData.fixturesCount} משחקים
                      </div>
                    </div>
                  </button>

                  {teamData.fixtures.length > 0 && (
                    <div className="bg-gray-50 px-4 py-2">
                      <div className="text-xs font-semibold text-gray-500 mb-2">
                        משחקים קרובים:
                      </div>
                      {teamData.fixtures.slice(0, 4).map((fixture) => (
                        <button
                          key={fixture._id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFixtureSelect(fixture);
                          }}
                          className="w-full text-right text-xs py-1 px-2 hover:bg-gray-100 rounded"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-gray-700">
                              {fixture.homeTeam.name} נגד{" "}
                              {fixture.awayTeam.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-600">
                                {new Date(fixture.date).toLocaleDateString(
                                  "he-IL",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                      {teamData.fixtures.length > 4 && (
                        <div className="text-xs text-gray-400 text-center mt-1">
                          +{teamData.fixtures.length - 4} משחקים נוספים
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {!isLoading && !error && !hasResults && (
            <div className="px-4 py-2 text-sm text-gray-500 text-center">
              לא נמצאו קבוצות עבור &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamSearchBar;
