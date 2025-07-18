import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("animate-pulse", className)}>
      {/* Featured Article Skeleton */}
      <div className="mb-8">
        <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
        <div className="space-y-3">
          <div className="bg-gray-200 rounded h-4 w-1/4"></div>
          <div className="bg-gray-200 rounded h-6 w-3/4"></div>
          <div className="bg-gray-200 rounded h-4 w-full"></div>
          <div className="bg-gray-200 rounded h-4 w-2/3"></div>
        </div>
      </div>

      {/* Article Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-card p-6">
            <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
            <div className="space-y-3">
              <div className="bg-gray-200 rounded h-4 w-1/4"></div>
              <div className="bg-gray-200 rounded h-5 w-full"></div>
              <div className="bg-gray-200 rounded h-4 w-3/4"></div>
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 rounded h-4 w-1/3"></div>
                <div className="bg-gray-200 rounded h-4 w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;