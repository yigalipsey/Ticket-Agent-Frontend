"use client";

import React from "react";
import TeamCarouselSkeleton from "@/components/league/TeamCarouselSkeleton";

export default function TeamsPageSkeleton() {
  return (
    <div className="space-y-12">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-12">
          {/* League Title Skeleton */}
          <div className="text-right mb-4">
            <div className="h-8 md:h-10 w-48 bg-gray-200 rounded-lg animate-pulse inline-block" />
          </div>

          {/* Teams Carousel Skeleton */}
          <TeamCarouselSkeleton />
        </div>
      ))}
    </div>
  );
}
