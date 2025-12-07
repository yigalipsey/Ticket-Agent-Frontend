"use client";

import React from "react";
import Card, { CardContent } from "@/components/ui/Card";

export function TeamDetailsInfoSkeleton() {
  return (
    <Card className="mb-6 animate-pulse">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stadium skeleton */}
          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0 mt-0.5"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          {/* City skeleton */}
          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0 mt-0.5"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          {/* Founded skeleton */}
          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0 mt-0.5"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>

          {/* Country skeleton */}
          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0 mt-0.5"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-14"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}








