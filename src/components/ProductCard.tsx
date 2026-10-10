import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { toBanglaNumber, formatBanglaPrice, formatBanglaUnit } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = product.change ? Math.abs(product.change.pct) : 0;
  const unitText = formatBanglaUnit(product.unit);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-xl hover:border-green-200 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
    >
      <div>
        {/* Top Header: Emoji & Category Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-50/80 group-hover:bg-green-50 border border-amber-100/60 group-hover:border-green-200 flex items-center justify-center text-3xl transition-colors shadow-xs">
            {product.image || product.categoryIcon || '📦'}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-500 bg-gray-100/80 px-2.5 py-1 rounded-full group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
              {product.categoryNameBn || 'নিত্যপ্রয়োজনীয়'}
            </span>
            <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-600 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-1">
          {product.nameBn}
        </h3>

        {/* Unit line */}
        <p className="text-xs font-medium text-gray-500 mb-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span>{unitText}</span>
        </p>
      </div>

      {/* Price row */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
        <div>
          <span className="text-[11px] font-medium text-gray-400 block">আজকের দাম</span>
          <span className="text-lg font-black text-gray-900 tracking-tight">
            {formatBanglaPrice(product.today)}
          </span>
        </div>

        {/* Change Badge */}
        <div>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              isUp
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60'
                : isDown
                ? 'text-rose-700 bg-rose-50 border border-rose-200/60'
                : 'text-gray-600 bg-gray-100 border border-gray-200'
            }`}
          >
            {isUp ? (
              <>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>▲ {toBanglaNumber(pct)}%</span>
              </>
            ) : isDown ? (
              <>
                <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                <span>▼ {toBanglaNumber(pct)}%</span>
              </>
            ) : (
              <>
                <Minus className="w-3.5 h-3.5 text-gray-500" />
                <span>— ০.০%</span>
              </>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
