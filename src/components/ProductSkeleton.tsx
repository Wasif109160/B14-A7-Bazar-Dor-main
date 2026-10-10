import React from 'react';

export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs animate-pulse flex flex-col justify-between h-48"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-200"></div>
              <div className="w-16 h-5 rounded-full bg-gray-200"></div>
            </div>
            <div className="w-3/4 h-5 rounded bg-gray-200 mb-2"></div>
            <div className="w-1/3 h-4 rounded bg-gray-200"></div>
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div className="w-14 h-3 rounded bg-gray-200 mb-1"></div>
              <div className="w-20 h-6 rounded bg-gray-200"></div>
            </div>
            <div className="w-16 h-6 rounded-full bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
