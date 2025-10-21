"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { debounce } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  onFilterClick?: () => void;
  showFilters?: boolean;
  isLoading?: boolean;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "חפש משחקים, ליגות, קבוצות...",
  value = "",
  onChange,
  onSearch,
  onClear,
  onFilterClick,
  showFilters = false,
  isLoading = false,
  suggestions = [],
  onSuggestionSelect,
  className,
  size = "md",
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 md:h-14 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((...args: unknown[]) => {
      const query = args[0] as string;
      if (onSearch && query.trim()) {
        onSearch(query.trim());
      }
    }, 300),
    [onSearch]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);

      if (newValue.trim()) {
        debouncedSearch(newValue);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
        onClear?.();
      }
    },
    [onChange, debouncedSearch, onClear]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch && inputValue.trim()) {
        onSearch(inputValue.trim());
        setShowSuggestions(false);
        inputRef.current?.blur();
      }
    },
    [onSearch, inputValue]
  );

  // Handle clear
  const handleClear = useCallback(() => {
    setInputValue("");
    onChange?.("");
    onClear?.();
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, [onChange, onClear]);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(
    (suggestion: string) => {
      setInputValue(suggestion);
      onChange?.(suggestion);
      onSuggestionSelect?.(suggestion);
      setShowSuggestions(false);
      inputRef.current?.blur();
    },
    [onChange, onSuggestionSelect]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions || suggestions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
            handleSuggestionSelect(suggestions[focusedIndex]);
          } else if (inputValue.trim()) {
            handleSubmit(e);
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          setFocusedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [
      showSuggestions,
      suggestions,
      focusedIndex,
      inputValue,
      handleSuggestionSelect,
      handleSubmit,
    ]
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 transition-colors"
              aria-label="חיפוש"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
            placeholder="הזן טקסט לחיפוש..."
            disabled={disabled}
            className={cn(
              "block w-full pl-16 pr-4 bg-transparent border-none rounded-lg",
              "focus:ring-0 focus:outline-none",
              "disabled:text-gray-500 disabled:cursor-not-allowed",
              "placeholder-gray-400 text-white",
              sizes[size],
              className
            )}
            aria-label="חיפוש"
            aria-expanded={showSuggestions}
            aria-haspopup="listbox"
            role="combobox"
            aria-controls="search-suggestions"
          />
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionSelect(suggestion)}
              className={cn(
                "w-full px-4 py-2 text-right text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
                focusedIndex === index && "bg-gray-50"
              )}
              role="option"
              aria-selected={focusedIndex === index}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
