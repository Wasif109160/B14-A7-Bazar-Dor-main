import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl">
        <div className="text-7xl mb-4 font-black text-green-600">
          ৪০৪
        </div>
        <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-4 text-3xl">
          🔍
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          পৃষ্ঠা পাওয়া যায়নি
        </h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি অথবা ঠিকানাটি ভুল হতে পারে।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Home className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
