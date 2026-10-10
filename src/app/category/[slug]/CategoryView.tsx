'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Category, SortOption } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import SortDropdown from '@/components/SortDropdown';
import { toBanglaNumber } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface CategoryViewProps {
  category: Category | null;
  initialProducts: Product[];
  slug: string;
}

export default function CategoryView({ category, initialProducts, slug }: CategoryViewProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Sort products based on sortOption (Challenge C1)
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [initialProducts, sortOption]);

  // If category does not exist or has no products
  if (!category || sortedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-gray-100 shadow-sm max-w-lg mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            দুঃখিত, <span className="font-semibold text-gray-700">“{slug}”</span> ক্যাটাগরির অধীনে কোনো পণ্যের তথ্য পাওয়া যায়নি অথবা ক্যাটাগরিটি বিদ্যমান নয়।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back button & Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-green-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Category Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center text-4xl sm:text-5xl shadow-xs">
            {category.icon || '🛍️'}
          </div>
          <div>
            <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">
              ক্যাটাগরি
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {toBanglaNumber(sortedProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort Control (Challenge C1) */}
        <div>
          <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
        </div>
      </div>

      {/* Product Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
