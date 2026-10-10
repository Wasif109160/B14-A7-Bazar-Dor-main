import React from 'react';

export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-pulse">
      <div className="w-32 h-6 bg-gray-200 rounded-lg"></div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-3xl"></div>
          <div className="space-y-3 flex-1">
            <div className="w-24 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-64 h-8 bg-gray-200 rounded"></div>
            <div className="w-48 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-48 h-20 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-28 bg-white rounded-2xl border border-gray-100 p-5"></div>
        <div className="h-28 bg-white rounded-2xl border border-gray-100 p-5"></div>
        <div className="h-28 bg-white rounded-2xl border border-gray-100 p-5"></div>
      </div>

      <div className="h-64 bg-white rounded-3xl border border-gray-100 p-8"></div>
    </div>
  );
}
