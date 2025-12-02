import React from "react";

export default function FixtureOffersLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SKELETON */}
      <div className="relative overflow-hidden w-full -mt-16 pt-16 h-[400px] md:h-[450px] mb-8">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#092274" }}
          />
          <div className="absolute inset-0 bg-[url('/images/spotlight.avif')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-[url('/images/small-pitch.avif')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        </div>

        {/* Centered content */}
        <div className="relative z-10 w-full mt-5 h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center px-4">
            {/* Date skeleton */}
            <div className="mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <div
                className="h-5 w-48 rounded animate-shimmer"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)",
                  backgroundSize: "1000px 100%",
                }}
              ></div>
            </div>

            {/* Teams block */}
            <div className="relative flex items-center justify-center gap-12 w-full">
              {/* HOME TEAM SKELETON */}
              <div className="flex flex-col items-center gap-2 w-[140px] md:w-[200px]">
                {/* Logo skeleton */}
                <div className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center rounded-sm overflow-hidden bg-white/10">
                  <div
                    className="w-full h-full animate-shimmer"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)",
                      backgroundSize: "1000px 100%",
                    }}
                  ></div>
                </div>
                {/* Name skeleton */}
                <div className="w-full">
                  <div
                    className="h-5 md:h-7 rounded mx-auto w-3/4 animate-shimmer"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)",
                      backgroundSize: "1000px 100%",
                    }}
                  ></div>
                </div>
              </div>

              {/* VS centered */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="text-white font-bold text-2xl md:text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                  VS
                </div>
              </div>

              {/* AWAY TEAM SKELETON */}
              <div className="flex flex-col items-center gap-2 w-[140px] md:w-[200px]">
                {/* Logo skeleton */}
                <div className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center rounded-sm overflow-hidden bg-white/10">
                  <div
                    className="w-full h-full animate-shimmer"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)",
                      backgroundSize: "1000px 100%",
                    }}
                  ></div>
                </div>
                {/* Name skeleton */}
                <div className="w-full">
                  <div
                    className="h-5 md:h-7 rounded mx-auto w-3/4 animate-shimmer"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)",
                      backgroundSize: "1000px 100%",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Venue skeleton */}
            <div className="mt-4">
              <div
                className="h-6 w-56 rounded animate-shimmer"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)",
                  backgroundSize: "1000px 100%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SKELETON */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Heading skeleton */}
        <div className="mb-4 mt-0">
          <div
            className="h-6 md:h-7 rounded w-full md:w-2/3 animate-shimmer"
            style={{
              background:
                "linear-gradient(to right, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
              backgroundSize: "1000px 100%",
            }}
          ></div>
        </div>

        {/* Offers List Skeleton */}
        <div className="flex flex-col gap-0">
          {[1, 2, 3, 4, 5].map((index) => (
            <OfferCardSkeleton key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Skeleton component for individual offer card
function OfferCardSkeleton() {
  const shimmerStyle = {
    background:
      "linear-gradient(to right, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
    backgroundSize: "1000px 100%",
  };

  return (
    <div className="bg-white border-t last:border-b border-gray-200 px-2 md:px-4 py-3 md:py-4">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row items-center gap-4">
        {/* Agent logo */}
        <div className="flex-shrink-0">
          <div
            className="w-32 h-20 rounded animate-shimmer"
            style={shimmerStyle}
          ></div>
        </div>

        {/* Star rating */}
        <div className="flex-shrink-0 flex">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded animate-shimmer"
                style={shimmerStyle}
              ></div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex-1 text-right">
          <div className="flex flex-col gap-1">
            <div
              className="h-4 w-16 rounded animate-shimmer ml-auto"
              style={shimmerStyle}
            ></div>
            <div
              className="h-8 w-24 rounded animate-shimmer ml-auto"
              style={shimmerStyle}
            ></div>
          </div>
        </div>

        {/* Contact/Purchase button */}
        <div className="flex-shrink-0">
          <div
            className="h-10 w-24 rounded-lg animate-shimmer"
            style={shimmerStyle}
          ></div>
        </div>
      </div>

      {/* Mobile layout - 4 equal columns */}
      <div className="md:hidden flex flex-row items-center justify-between gap-1">
        {/* Column 1 - Agent logo */}
        <div className="flex-1 flex justify-center items-center">
          <div
            className="w-20 h-14 rounded animate-shimmer"
            style={shimmerStyle}
          ></div>
        </div>

        {/* Column 2 - Star rating */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded animate-shimmer"
                style={shimmerStyle}
              ></div>
            ))}
          </div>
        </div>

        {/* Column 3 - Price */}
        <div className="flex-1 flex justify-center items-center text-center">
          <div className="flex flex-col gap-1">
            <div
              className="h-3 w-12 rounded animate-shimmer mx-auto"
              style={shimmerStyle}
            ></div>
            <div
              className="h-5 w-16 rounded animate-shimmer mx-auto"
              style={shimmerStyle}
            ></div>
          </div>
        </div>

        {/* Column 4 - Contact/Purchase button */}
        <div className="flex-1 flex justify-center items-center">
          <div
            className="h-7 w-16 rounded-lg animate-shimmer"
            style={shimmerStyle}
          ></div>
        </div>
      </div>
    </div>
  );
}
