"use client";

import React from "react";
import SearchSection from "@/components/home/SearchSection";

export default function HeroSection() {
  return (
    <section className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/people-soccer-stadium.avif')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
            TicketAgent
          </h1>
          <p className="text-lg md:text-5xl mb-6 md:mb-8 text-gray-200 animate-slide-up">
            השוואת כרטיסים למשחקי כדורגל
          </p>

          {/* Search Bar */}
          <SearchSection />
        </div>
      </div>
    </section>
  );
}
