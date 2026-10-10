'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { toBanglaNumber, formatBanglaUnit } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate list to achieve seamless infinite looping
  const items = [...products, ...products];

  return (
    <div className="bg-slate-900 text-white text-xs py-2 overflow-hidden border-b border-slate-800 shadow-inner select-none relative">
      <div className="flex animate-marquee items-center gap-6">
        {items.map((p, idx) => {
          const isUp = p.change.dir === 'up';
          const isDown = p.change.dir === 'down';
          const pct = Math.abs(p.change.pct);
          const unit = formatBanglaUnit(p.unit).replace('প্রতি ', '');

          return (
            <Link
              key={`${p.id}-${idx}`}
              href={`/product/${p.slug}`}
              className="inline-flex items-center gap-2 hover:text-green-300 transition-colors whitespace-nowrap px-2 group"
            >
              <span className="text-sm">{p.image || p.categoryIcon || '📦'}</span>
              <span className="font-semibold text-gray-200 group-hover:text-white">{p.nameBn}</span>
              <span className="text-gray-400">
                {toBanglaNumber(p.today)} টাকা/{unit}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold ${
                  isUp
                    ? 'text-emerald-400 bg-emerald-950/60'
                    : isDown
                    ? 'text-rose-400 bg-rose-950/60'
                    : 'text-gray-400 bg-gray-800'
                }`}
              >
                {isUp ? (
                  <>
                    <TrendingUp className="w-3 h-3 inline" />
                    <span>▲ {toBanglaNumber(pct)}%</span>
                  </>
                ) : isDown ? (
                  <>
                    <TrendingDown className="w-3 h-3 inline" />
                    <span>▼ {toBanglaNumber(pct)}%</span>
                  </>
                ) : (
                  <>
                    <Minus className="w-3 h-3 inline" />
                    <span>— ০.০%</span>
                  </>
                )}
              </span>
              <span className="text-gray-600 ml-2">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
