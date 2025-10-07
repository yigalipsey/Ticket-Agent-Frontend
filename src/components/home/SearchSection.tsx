"use client";

import React from "react";
import { SearchBar } from "@/components";

export default function SearchSection() {
  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log("Search query:", query);
  };

  const handleFilterClick = () => {
    // TODO: Implement filter functionality
    console.log("Filter clicked");
  };

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <SearchBar
        placeholder="חפש משחקים, קבוצות או ליגות..."
        onSearch={handleSearch}
        onFilterClick={handleFilterClick}
        showFilters={true}
        size="lg"
        className="bg-white/90 backdrop-blur-sm"
      />
    </div>
  );
}
