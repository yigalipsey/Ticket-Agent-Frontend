export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton - תואם ל-LeagueHero */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="flex items-center gap-4 animate-pulse">
            {/* League Logo Skeleton */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/20 flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full"></div>
              </div>
            </div>

            {/* League Title Skeleton */}
            <div className="flex flex-col gap-3 md:gap-4 items-start">
              <div className="h-4 md:h-5 bg-white/20 rounded w-32 md:w-40"></div>
              <div className="h-8 md:h-10 bg-white/30 rounded w-48 md:w-64"></div>
              <div className="hidden md:block h-5 bg-white/20 rounded w-64 md:w-80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Carousel Skeleton - תואם ל-TeamCarousel */}
      <div className="max-w-7xl mx-auto mt-3 md:mt-8 md:p-6 bg-white">
        <div className="flex gap-4 overflow-hidden px-4 md:px-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 text-center space-y-3 p-2 min-w-[100px] flex flex-col items-center animate-pulse"
            >
              <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full bg-gray-200 border-2 border-gray-100"></div>
              <div className="h-4 w-20 md:w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Fixtures Skeleton - תואם ל-LeagueFixtures */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 bg-white">
          {/* Filters Skeleton */}
          <div className="mb-6 flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Fixtures List Skeleton */}
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm animate-pulse"
              >
                <div className="flex justify-between items-center gap-4">
                  {/* Home Team */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>

                  {/* Match Info */}
                  <div className="flex flex-col items-center gap-2 min-w-[120px]">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <div className="space-y-2 flex-1 text-right">
                      <div className="h-4 bg-gray-200 rounded w-24 ml-auto"></div>
                      <div className="h-3 bg-gray-200 rounded w-16 ml-auto"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  </div>
                </div>

                {/* Offers Info Skeleton */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
