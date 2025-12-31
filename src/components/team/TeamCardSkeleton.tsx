"use client";

import React from "react";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";

export function TeamCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Logo skeleton */}
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
          
          <div className="flex-1 space-y-2">
            {/* Team name skeleton */}
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            {/* City and country skeleton */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stadium skeleton */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0"></div>
          <div className="flex-1 space-y-1">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Button skeleton */}
      <div className="px-6 pb-6">
        <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
      </div>
    </Card>
  );
}











