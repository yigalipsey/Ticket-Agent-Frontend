import React from "react";
import { TeamCarouselSkeleton } from "@/components/league/TeamCarouselSkeleton";
import HeroSection from "@/components/home/HeroSection";

export default function TeamsPageLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* League sections skeleton */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="mb-12">
              {/* League Title skeleton */}
              <div className="text-right mb-4">
                <div className="h-8 bg-gray-200 rounded w-48 animate-pulse inline-block"></div>
              </div>

              {/* Teams Carousel skeleton */}
              <TeamCarouselSkeleton count={6} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}








