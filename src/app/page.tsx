"use client";

import React from "react";
import Link from "next/link";
import { SearchBar, PopularLeaguesSection } from "@/components";

export default function HomePage() {
  // Data fetching moved to PopularLeaguesSection component

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log("Search query:", query);
  };

  const handleFilterClick = () => {
    // TODO: Implement filter functionality
    console.log("Filter clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/people-soccer-stadium.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-6xl font-bold mb-6 animate-fade-in">
              TicketAgent
            </h1>
            <p className="text-2xl md:text-5xl mb-8 text-gray-200 animate-slide-up">
              השוואת כרטיסים למשחקי כדורגל
            </p>

            {/* Search Bar */}
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
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Leagues */}
        <PopularLeaguesSection />

        {/* Featured Teams */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">קבוצות מובילות</h2>
            <Link
              href="/teams"
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              צפה בכל הקבוצות →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* ריאל מדריד */}
            <Link href="/teams/real-madrid" className="block">
              <div className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">⚪</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  ריאל מדריד
                </h3>
                <p className="text-sm text-gray-600">ספרד</p>
              </div>
            </Link>

            {/* ברצלונה */}
            <Link href="/teams/barcelona" className="block">
              <div className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🔵</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  ברצלונה
                </h3>
                <p className="text-sm text-gray-600">ספרד</p>
              </div>
            </Link>

            {/* ארסנל */}
            <Link href="/teams/arsenal" className="block">
              <div className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🔴</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  ארסנל
                </h3>
                <p className="text-sm text-gray-600">אנגליה</p>
              </div>
            </Link>

            {/* ליברפול */}
            <Link href="/teams/liverpool" className="block">
              <div className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🔴</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  ליברפול
                </h3>
                <p className="text-sm text-gray-600">אנגליה</p>
              </div>
            </Link>

            {/* צ'לסי */}
            <Link href="/teams/chelsea" className="block">
              <div className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🔵</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  צ'לסי
                </h3>
                <p className="text-sm text-gray-600">אנגליה</p>
              </div>
            </Link>

            {/* מנצ'סטר סיטי */}
            <Link href="/teams/manchester-city" className="block">
              <div className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🔵</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  מנצ'סטר סיטי
                </h3>
                <p className="text-sm text-gray-600">אנגליה</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Top Venues */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              אצטדיונים מובילים
            </h2>
            <Link
              href="/venues"
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              צפה בכל האצטדיונים →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-8 text-center shadow-soft">
            <div className="text-gray-500 mb-4">
              <svg
                className="h-12 w-12 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              אצטדיונים מובילים
            </h3>
            <p className="text-gray-600">
              בקרוב נוסיף רשימה של האצטדיונים הפופולריים ביותר
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
