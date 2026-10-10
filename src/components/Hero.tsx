import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, TrendingUp, Store, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50/70 via-white to-gray-50/40 border-b border-gray-100 py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow badge stats */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-white/90 border border-green-200/80 rounded-full px-4 py-1.5 shadow-2xs text-xs font-semibold text-gray-700">
              <span className="flex items-center gap-1 text-green-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>৩৩টি নিত্যদিনের পণ্য</span>
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-amber-700">
                <Store className="w-3.5 h-3.5" />
                <span>১২টি বাজার অন্তর্ভুক্ত</span>
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-blue-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>৬টি বিভাগের তথ্য</span>
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              আজকের বাজারের দাম <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600">
                এক নজরে
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="#সব-পণ্য"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </Link>

              <span className="text-xs text-gray-500 font-medium">
                প্রতিদিন সকালের তাজা তথ্যে আপডেটকৃত
              </span>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-green-100/70 via-emerald-50 to-amber-50/50 p-6 flex items-center justify-center border border-green-100 shadow-xl group">
              <div className="absolute inset-0 bg-radial from-green-200/40 via-transparent to-transparent rounded-3xl -z-10 blur-xl"></div>
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো চিত্র"
                width={400}
                height={400}
                priority
                className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 max-h-72 sm:max-h-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
