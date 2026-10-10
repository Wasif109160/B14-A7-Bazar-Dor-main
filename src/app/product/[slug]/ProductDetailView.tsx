'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { useSession } from '@/lib/auth-client';
import {
  toBanglaNumber,
  formatBanglaPrice,
  formatBanglaUnit,
} from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Store,
  MapPin,
  Lock,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product | null;
  slug: string;
}

export default function ProductDetailView({ product, slug }: ProductDetailViewProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [hasRedirected, setHasRedirected] = useState(false);

  // Protected route check
  useEffect(() => {
    if (!isPending && !session?.user && !hasRedirected) {
      setHasRedirected(true);
      toast.error('বিস্তারিত দেখতে প্রথমে সাইন ইন করুন');
      router.push(`/signin?redirect=/product/${slug}`);
    }
  }, [isPending, session, slug, router, hasRedirected]);

  // Calculations for price summary
  const priceStats = useMemo(() => {
    if (!product || !product.markets || product.markets.length === 0) {
      return {
        minPrice: product?.today || 0,
        maxPrice: product?.today || 0,
        avgPrice: product?.today || 0,
        cheapestMarket: null,
        expensiveMarket: null,
        divisions: [] as string[],
      };
    }

    const allMins = product.markets.map((m) => m.min);
    const allMaxs = product.markets.map((m) => m.max);

    const minPrice = Math.min(...allMins);
    const maxPrice = Math.max(...allMaxs);

    // Calculate overall average
    const totalMid = product.markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0);
    const avgPrice = Math.round(totalMid / product.markets.length);

    // Find cheapest and most expensive market
    const cheapestMarket = [...product.markets].sort((a, b) => a.min - b.min)[0];
    const expensiveMarket = [...product.markets].sort((a, b) => b.max - a.max)[0];

    // Unique divisions
    const divisions = Array.from(new Set(product.markets.map((m) => m.division)));

    return {
      minPrice,
      maxPrice,
      avgPrice,
      cheapestMarket,
      expensiveMarket,
      divisions,
    };
  }, [product]);

  // Filter markets by division
  const filteredMarkets = useMemo(() => {
    if (!product?.markets) return [];
    if (selectedDivision === 'all') return product.markets;
    return product.markets.filter((m) => m.division === selectedDivision);
  }, [product, selectedDivision]);

  // Loading state while verifying auth session
  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs animate-pulse space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-3 flex-1">
              <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="h-28 bg-gray-200 rounded-2xl"></div>
            <div className="h-28 bg-gray-200 rounded-2xl"></div>
            <div className="h-28 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, show protected route access prompt while redirecting
  if (!session?.user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">সাইন ইন প্রয়োজন</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            পণ্যের বাজারভিত্তিক বিস্তারিত দর এবং ঐতিহাসিক তথ্য দেখতে আপনার অ্যাকাউন্টে সাইন ইন করা প্রয়োজন।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/signin?redirect=/product/${slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors shadow-sm"
            >
              <span>সাইন ইন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/signup?redirect=/product/${slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              <span>নতুন অ্যাকাউন্ট খুলুন</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If product is not found
  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">পণ্যটি খুঁজে পাওয়া যায়নি</h2>
          <p className="text-gray-500 text-sm mb-6">
            দুঃখিত, এই নামের কোনো পণ্য ডাটাবেজে পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = product.change ? Math.abs(product.change.pct) : 0;
  const unitText = formatBanglaUnit(product.unit);
  const diffFromYesterday = product.today - (product.yesterday || product.today);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-green-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Top — Summary Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-50/90 border border-amber-200/80 flex items-center justify-center text-5xl sm:text-6xl shadow-sm shrink-0">
              {product.image || product.categoryIcon || '🍚'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Link
                  href={`/category/${product.category}`}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
                >
                  {product.categoryNameBn || 'নিত্যপণ্য'}
                </Link>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                  {unitText}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <span>
                  {diffFromYesterday > 0
                    ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBanglaNumber(diffFromYesterday)} টাকা`
                    : diffFromYesterday < 0
                    ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBanglaNumber(Math.abs(diffFromYesterday))} টাকা`
                    : 'গতকালের তুলনায় দামে কোনো পরিবর্তন হয়নি'}
                </span>
              </p>
            </div>
          </div>

          {/* Current Today's Price Card */}
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200/80 text-right md:min-w-56">
            <span className="text-xs font-semibold text-gray-500 block mb-1">আজকের বাজার দর</span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {formatBanglaPrice(product.today)}
            </div>
            <div className="mt-2 flex justify-end">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  isUp
                    ? 'text-emerald-700 bg-emerald-100 border border-emerald-300'
                    : isDown
                    ? 'text-rose-700 bg-rose-100 border border-rose-300'
                    : 'text-gray-600 bg-gray-200 border border-gray-300'
                }`}
              >
                {isUp ? (
                  <>
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>▲ {toBanglaNumber(pct)}% বেড়েছে</span>
                  </>
                ) : isDown ? (
                  <>
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>▼ {toBanglaNumber(pct)}% কমেছে</span>
                  </>
                ) : (
                  <>
                    <Minus className="w-3.5 h-3.5" />
                    <span>— অপরিবর্তিত</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price - Summary Cards */}
      <div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          দামের সারসংক্ষেপ
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Minimum Price */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs relative overflow-hidden group hover:border-green-200 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
            <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center justify-between">
              <span>সর্বনিম্ন দাম</span>
              <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full">
                সাশ্রয়ী
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">
              {formatBanglaPrice(priceStats.minPrice)}
            </div>
            {priceStats.cheapestMarket && (
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">
                  {priceStats.cheapestMarket.market} ({priceStats.cheapestMarket.division})
                </span>
              </p>
            )}
          </div>

          {/* Average Price */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs relative overflow-hidden group hover:border-green-200 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
            <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center justify-between">
              <span>গড় দাম</span>
              <span className="text-blue-600 font-bold text-[11px] bg-blue-50 px-2 py-0.5 rounded-full">
                প্রত্যাশিত
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">
              {formatBanglaPrice(priceStats.avgPrice)}
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <span>১২টি বাজারের তথ্যের ভিত্তিতে বিশ্লেষিত</span>
            </p>
          </div>

          {/* Maximum Price */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs relative overflow-hidden group hover:border-green-200 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
            <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center justify-between">
              <span>সর্বাধিক দাম</span>
              <span className="text-rose-600 font-bold text-[11px] bg-rose-50 px-2 py-0.5 rounded-full">
                সর্বোচ্চ
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">
              {formatBanglaPrice(priceStats.maxPrice)}
            </div>
            {priceStats.expensiveMarket && (
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">
                  {priceStats.expensiveMarket.market} ({priceStats.expensiveMarket.division})
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market breakdown) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Store className="w-5 h-5 text-green-700" />
              <span>বাজারভিত্তিক আজকের দাম</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              বিভিন্ন বাজার ও বিভাগ অনুযায়ী পণ্যের সর্বনিম্ন ও সর্বোচ্চ দামের তালিকা
            </p>
          </div>

          {/* Division Filter */}
          {priceStats.divisions.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" />
                <span>বিভাগ:</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedDivision('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDivision === 'all'
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                সব বিভাগ
              </button>
              {priceStats.divisions.map((div) => (
                <button
                  key={div}
                  type="button"
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedDivision === div
                      ? 'bg-green-600 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Markets Table / Cards */}
        {filteredMarkets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-gray-600 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 rounded-l-xl">বাজারের নাম</th>
                  <th className="py-3.5 px-4">বিভাগ</th>
                  <th className="py-3.5 px-4">সর্বনিম্ন দাম</th>
                  <th className="py-3.5 px-4">সর্বাধিক দাম</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">গড় দাম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredMarkets.map((m, idx) => {
                  const mid = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={`${m.market}-${idx}`}
                      className="hover:bg-green-50/40 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-bold text-gray-900 flex items-center gap-2">
                        <Store className="w-4 h-4 text-gray-400 group-hover:text-green-700 transition-colors" />
                        <span>{m.market}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{m.division}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">
                        {toBanglaNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-rose-700">
                        {toBanglaNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-gray-900">
                        {toBanglaNumber(mid)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 text-sm">
            এই বিভাগে কোনো বাজার পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
