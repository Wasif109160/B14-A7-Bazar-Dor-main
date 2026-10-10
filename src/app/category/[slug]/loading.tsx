import React from 'react';
import ProductSkeleton from '@/components/ProductSkeleton';

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs mb-8 flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-200"></div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-40 h-8 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="w-36 h-10 bg-gray-200 rounded-xl"></div>
      </div>

      <ProductSkeleton count={8} />
    </div>
  );
}
