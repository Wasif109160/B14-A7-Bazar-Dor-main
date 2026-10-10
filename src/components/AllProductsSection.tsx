'use client';

import React, { useState, useMemo } from 'react';
import { Product, Category, SortOption } from '@/lib/types';
import ProductCard from './ProductCard';
import SortDropdown from './SortDropdown';
import { toBanglaNumber } from '@/lib/utils';
import { Search, ShoppingBag } from 'lucide-react';

interface AllProductsSectionProps {
  products: Product[];
  categories: Category[];
}

export default function AllProductsSection({ products, categories }: AllProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category === selectedCategory || p.categoryNameBn === selectedCategory
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.categoryNameBn.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    // Sort by numeric today's price (Challenge C1)
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <section id="সব-পণ্য" className="scroll-mt-24 pt-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-2 border border-green-200">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>বাজারের সম্পূর্ণ তালিকা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            মোট {toBanglaNumber(filteredAndSortedProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Controls: Search and Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Live Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্যের নাম লিখুন…"
              className="w-full pl-9.5 pr-4 py-2 text-sm bg-white rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown (Challenge C1) */}
          <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-gray-900 text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          সব পণ্য
        </button>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-green-600 text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Products */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200 max-w-md mx-auto my-6">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">কোনো পণ্য খুঁজে পাওয়া যায়নি</h3>
          <p className="text-sm text-gray-500 mb-4">
            আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য এই মুহূর্তে নেই।
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors cursor-pointer"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      )}
    </section>
  );
}
