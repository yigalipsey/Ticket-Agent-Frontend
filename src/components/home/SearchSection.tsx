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
    <section className="w-[90%] md:max-w-[500px] mx-auto">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg shadow-lg">
        <SearchBar
          placeholder="הזן טקסט לחיפוש..."
          onSearch={handleSearch}
          onFilterClick={handleFilterClick}
          showFilters={true}
          size="lg"
        />
      </div>
    </section>
  );
}
