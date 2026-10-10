import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendingSectionsProps {
  products: Product[];
}

export default function TrendingSections({ products }: TrendingSectionsProps) {
  // Top 6 Risers (dir === 'up', sorted by pct descending)
  const risers = products
    .filter((p) => p.change && p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 Fallers (dir === 'down', sorted by pct magnitude descending)
  const fallers = products
    .filter((p) => p.change && p.change.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-14 py-6">
      {/* Section A: আজ দাম বেড়েছে ▲ */}
      {risers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center font-bold shadow-2xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-emerald-600 text-lg sm:text-xl">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  গতকালের তুলনায় আজ যেসব পণ্যের দাম বৃদ্ধি পেয়েছে
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 hidden sm:inline">
              শীর্ষ ৬টি পণ্য
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {risers.map((p) => (
              <ProductCard key={`riser-${p.id}`} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Section B: আজ দাম কমেছে ▼ */}
      {fallers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center font-bold shadow-2xs">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-rose-600 text-lg sm:text-xl">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  গতকালের তুলনায় আজ যেসব পণ্যের দাম কমে সাশ্রয়ী হয়েছে
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 hidden sm:inline">
              শীর্ষ ৬টি পণ্য
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {fallers.map((p) => (
              <ProductCard key={`faller-${p.id}`} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
