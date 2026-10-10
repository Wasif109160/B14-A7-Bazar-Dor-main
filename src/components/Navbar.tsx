'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { getBanglaDate } from '@/lib/utils';
import { Category } from '@/lib/types';
import toast from 'react-hot-toast';
import { User, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';

interface NavbarProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

export default function Navbar({ categories = defaultCategories }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [banglaDate, setBanglaDate] = useState<string>('শনিবার, ১০ অক্টোবর, ২০২৬');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setBanglaDate(getBanglaDate());
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('সফলভাবে সাইন আউট করা হয়েছে');
      router.push('/');
      router.refresh();
    } catch {
      toast.error('সাইন আউট করতে সমস্যা হয়েছে');
    }
  };

  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      {/* Top Bar: Brand, Date, and Auth */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Left: Brand Logo & Bangla Date */}
          <Link href="/" className="flex flex-col group py-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl transition-transform group-hover:scale-110">🛒</span>
              <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-green-700 transition-colors">
                বাজার দর
              </span>
            </div>
            <span className="text-xs font-medium text-gray-500 mt-0.5 tracking-wide">
              {banglaDate}
            </span>
          </Link>

          {/* Desktop Right Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname.startsWith('/profile')
                      ? 'bg-green-100 text-green-800 ring-1 ring-green-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <User className="w-4 h-4 text-green-700" />
                  <span>{session.user.name || 'আমার প্রোফাইল'}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>সাইন আউট</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-green-700 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>সাইন ইন</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-all shadow-sm hover:shadow"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>সাইন আপ</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Category Navigation Links (Desktop) */}
      <div className="border-t border-gray-100 bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar text-sm font-medium">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isHome
                  ? 'bg-green-600 text-white shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-green-700 hover:bg-gray-200/60'
              }`}
            >
              <span>🏠</span>
              <span>হোম</span>
            </Link>

            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-green-600 text-white shadow-xs font-semibold'
                      : 'text-gray-600 hover:text-green-700 hover:bg-gray-200/60'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2">
          {session?.user ? (
            <div className="space-y-2 pb-3 border-b border-gray-100">
              <div className="text-xs text-gray-500 font-medium">লগইন করা আছে:</div>
              <div className="font-semibold text-gray-900">{session.user.name || session.user.email}</div>
              <div className="flex gap-2 pt-1">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-sm font-semibold rounded-lg bg-green-50 text-green-700 border border-green-200"
                >
                  আমার প্রোফাইল
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="px-3 py-2 text-sm font-medium rounded-lg text-red-600 border border-red-200 hover:bg-red-50"
                >
                  সাইন আউট
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                সাইন আপ
              </Link>
            </div>
          )}

          <div>
            <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">ক্যাটাগরি সমূহ</div>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                  isHome ? 'bg-green-600 text-white font-semibold' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>🏠</span>
                <span>হোম</span>
              </Link>
              {categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      isActive ? 'bg-green-600 text-white font-semibold' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
