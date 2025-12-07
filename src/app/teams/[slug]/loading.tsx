import React from "react";
import { TeamHeaderLoading } from "@/components/team/TeamHeader";
import { TeamDetailsInfoSkeleton } from "@/components/team/TeamDetailsInfoSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Loading */}
      <TeamHeaderLoading />

      {/* Team Details Info Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <TeamDetailsInfoSkeleton />
      </div>

      {/* Fixtures Loading Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-6">
          {/* Filters Skeleton - Matches TeamFixturesFilter UI */}
          <div className="w-full animate-pulse">
            {/* Desktop & Tablet Layout Skeleton */}
            <div className="hidden md:flex items-center gap-4 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-fit">
              {/* Home/Away Buttons Skeleton - pill shape */}
              <div className="h-[42px] w-[300px] bg-gray-100 rounded-full border border-gray-200"></div>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-200 mx-1"></div>

              {/* League Filter Skeleton - rounded-full */}
              <div className="h-10 w-40 bg-gray-100 rounded-full border border-gray-200"></div>

              {/* Month Filter Skeleton - rounded-full */}
              <div className="h-10 w-40 bg-gray-100 rounded-full border border-gray-200"></div>
            </div>

            {/* Mobile Layout Skeleton */}
            <div className="flex md:hidden flex-col gap-3">
              {/* Home/Away Buttons Skeleton - pill shape */}
              <div className="h-10 w-full bg-gray-100 rounded-full border border-gray-200"></div>

              {/* Dropdowns Grid Skeleton */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 w-full bg-gray-100 rounded-full border border-gray-200"></div>
                <div className="h-10 w-full bg-gray-100 rounded-full border border-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Fixtures Skeleton */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="bg-white border-b border-gray-200 last:border-b-0"
              >
                <div className="p-4 flex flex-row items-start gap-4">
                  {/* Date Box Skeleton */}
                  <div className="flex flex-col items-center justify-start bg-gray-50 px-3 py-2 rounded flex-shrink-0 w-20 h-20 mt-1">
                    <div className="h-3 w-12 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-6 w-10 bg-gray-300 rounded mb-1 animate-pulse"></div>
                    <div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Desktop containers wrapper */}
                  <div className="hidden md:flex items-center gap-4">
                    {/* League logo skeleton */}
                    <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-20 h-20">
                      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Teams Skeleton */}
                  <div className="flex md:items-center flex-1 min-w-0 gap-2 md:gap-6">
                    {/* Desktop layout */}
                    <div className="hidden md:flex items-center gap-6 min-w-0">
                      <div className="flex items-start gap-6 min-h-[80px] flex-shrink-0">
                        {/* Home Team Skeleton */}
                        <div className="flex flex-col items-center gap-2 w-32">
                          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        {/* VS */}
                        <span className="text-base font-medium text-gray-300 px-2 flex-shrink-0 self-center">
                          נגד
                        </span>

                        {/* Away Team Skeleton */}
                        <div className="flex flex-col items-center gap-2 w-32">
                          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      {/* Venue skeleton on desktop */}
                      <div className="flex flex-col gap-1 flex-shrink-0 bg-gray-50 rounded-lg px-3 py-2 w-[280px]">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="md:hidden flex flex-col flex-1 w-full min-w-0 gap-2">
                      <div className="flex items-center flex-wrap w-full">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <span className="text-gray-300 mx-1">נגד</span>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button Skeleton */}
                  <div className="flex-shrink-0 md:self-center">
                    <div className="w-10 h-10 md:w-32 md:h-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
