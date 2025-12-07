import React from "react";

export default function ReviewsListLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Skeleton */}
      <div className="h-64 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center w-full max-w-md px-4">
            <div className="h-10 bg-gray-700 rounded-lg mb-4 w-3/4 mx-auto animate-pulse" />
            <div className="h-6 bg-gray-800 rounded-lg w-1/2 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 -mt-20 relative z-30">
        {/* Agent Header Skeleton */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-xl bg-gray-100 flex-shrink-0 animate-pulse" />
          <div className="text-center md:text-right flex-grow w-full md:w-auto">
            <div className="h-8 bg-gray-100 rounded-lg w-1/3 mb-3 animate-pulse mx-auto md:mx-0" />
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
              <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-10 bg-gray-100 rounded-xl w-32 animate-pulse mx-auto md:mx-0" />
          </div>
        </div>

        {/* Reviews List Skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mb-6 animate-pulse" />
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
                  <div>
                    <div className="h-5 bg-gray-100 rounded w-24 mb-1 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                  </div>
                </div>
                <div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}








