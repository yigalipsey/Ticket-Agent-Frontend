import React from "react";

export default function ReviewPageLoading() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl mx-auto">
          <div className="p-6 md:p-8">
            {/* Header with Agent Info Skeleton */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 animate-pulse" />
              <div className="flex-grow">
                <div className="h-8 bg-gray-100 rounded-lg w-2/3 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-100 rounded-lg w-full animate-pulse" />
              </div>
            </div>

            {/* Info Box Skeleton */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8 flex items-start gap-3 h-24 animate-pulse" />

            {/* Form Skeleton */}
            <div className="space-y-8">
              {/* Rating */}
              <div>
                <div className="h-5 bg-gray-100 rounded w-1/3 mb-3 animate-pulse" />
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-100 rounded w-1/4 animate-pulse" />
                  <div className="h-12 bg-gray-100 rounded-xl w-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-100 rounded w-1/4 animate-pulse" />
                  <div className="h-12 bg-gray-100 rounded-xl w-full animate-pulse" />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-100 rounded w-1/4 animate-pulse" />
                <div className="h-32 bg-gray-100 rounded-xl w-full animate-pulse border-2 border-gray-200 border-dashed" />
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-100 rounded w-1/4 animate-pulse" />
                <div className="h-32 bg-gray-100 rounded-xl w-full animate-pulse" />
              </div>

              {/* Button */}
              <div className="h-14 bg-gray-100 rounded-xl w-full animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}








