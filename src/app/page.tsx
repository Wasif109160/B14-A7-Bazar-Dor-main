import React from 'react';
import Hero from '@/components/Hero';
import TrendingSections from '@/components/TrendingSections';
import AllProductsSection from '@/components/AllProductsSection';
import { getProducts, getCategories } from '@/lib/api';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* 1. Hero / Banner */}
      <Hero />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* 2. Section A & Section B: আজ দাম বেড়েছে ও কমেছে */}
        <TrendingSections products={products} />

        {/* 3. Section C: সব পণ্য with Search, Category Filter, and Sorting */}
        <AllProductsSection products={products} categories={categories} />
      </div>
    </div>
  );
}
