'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-auto bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Brand & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-700">
            <span className="font-bold text-gray-900 flex items-center gap-1.5 text-base">
              <span>🛒</span>
              <span>বাজার দর</span>
            </span>
            <span className="hidden sm:inline text-gray-300">—</span>
            <span className="text-gray-600">প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
          </div>

          {/* Right Disclaimer */}
          <div className="text-xs text-gray-500 max-w-md italic">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>
            © {year} বাজার দর (BazarDor) • সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-green-700 transition-colors">হোম</Link>
            <Link href="/#সব-পণ্য" className="hover:text-green-700 transition-colors">সব পণ্য</Link>
            <Link href="/signin" className="hover:text-green-700 transition-colors">সাইন ইন</Link>
            <Link href="/signup" className="hover:text-green-700 transition-colors">সাইন আপ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
