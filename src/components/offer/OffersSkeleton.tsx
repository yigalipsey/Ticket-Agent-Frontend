import React from "react";

export function OffersSkeleton() {
  return (
    <div className="flex flex-col gap-0 mt-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-white border-t border-b border-gray-200 px-2 md:px-4"
        >
          {/* Desktop skeleton */}
          <div className="hidden md:flex flex-row items-center gap-4">
            {/* Agent logo skeleton */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
            </div>

            {/* Star rating skeleton */}
            <div className="flex-shrink-0 flex">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Price skeleton */}
            <div className="flex-1">
              <div className="flex items-center gap-2 justify-end">
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Button skeleton */}
            <div className="flex-shrink-0">
              <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Mobile skeleton - 4 equal columns */}
          <div className="md:hidden flex flex-row items-center justify-between gap-1">
            {/* Column 1 - Agent logo skeleton */}
            <div className="flex-1 flex justify-center items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
            </div>

            {/* Column 2 - Star rating skeleton */}
            <div className="flex-1 flex justify-center items-center">
              <div className="flex gap-0.5">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Column 3 - Price skeleton */}
            <div className="flex-1 flex justify-center items-center">
              <div className="flex flex-col items-center gap-1">
                <div className="h-3 w-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Column 4 - Button skeleton */}
            <div className="flex-1 flex justify-center items-center">
              <div className="w-full max-w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
