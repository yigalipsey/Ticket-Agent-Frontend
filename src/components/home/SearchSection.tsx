"use client";

import React from "react";
import { SearchBar } from "@/components";

export default function SearchSection() {
  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
  };

  const handleFilterClick = () => {
    // TODO: Implement filter functionality
  };

  return (
    <section className="max-w-3xl mx-auto mt-12 px-4">
      <div className="bg-white  rounded-lg shadow-sm">
        <SearchBar
          placeholder="חפש משחקים, קבוצות או ליגות..."
          onSearch={handleSearch}
          onFilterClick={handleFilterClick}
          showFilters={true}
          size="lg"
        />
      </div>
    </section>
  );
}
