"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.css";

interface TeamCarouselSkeletonProps {
  count?: number;
}

/**
 * Team Carousel Skeleton - סקלטון לקרוסלת קבוצות
 */
export function TeamCarouselSkeleton({ count = 6 }: TeamCarouselSkeletonProps) {
  const [sliderRef] = useKeenSlider({
    rtl: true,
    slides: {
      perView: 6,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 3, spacing: 12 },
      },
      "(min-width: 641px) and (max-width: 1024px)": {
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 1025px)": {
        slides: { perView: 6, spacing: 16 },
      },
    },
    loop: false,
  });

  return (
    <div className="relative bg-white animate-pulse">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Navigation button skeleton */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex-shrink-0"></div>

        {/* Carousel skeleton */}
        <div ref={sliderRef} className="keen-slider bg-white flex-1">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="keen-slider__slide">
              <div className="flex flex-col items-center text-center space-y-2 p-2">
                {/* Logo skeleton */}
                <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full bg-gray-200"></div>
                {/* Team name skeleton */}
                <div className="h-5 bg-gray-200 rounded w-20 md:w-24"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation button skeleton */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
      </div>
    </div>
  );
}








