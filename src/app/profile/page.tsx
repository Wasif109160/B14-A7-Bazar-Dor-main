'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { User, Mail, Calendar, ShieldCheck, Edit3, LogOut, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error('প্রোফাইল দেখতে প্রথমে সাইন ইন করুন');
      router.push('/signin?redirect=/profile');
    }
  }, [isPending, session, router]);

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

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-pulse space-y-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const createdAtFormatted = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'সম্প্রতি';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-green-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-500 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-lg">
              <div className="w-full h-full rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-700 text-3xl font-black">
                {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {user.name || 'সম্মানিত ইউজার'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>{user.email}</span>
              </p>
            </div>

            {/* Challenge C3: Update button */}
            <Link
              href="/profile/update"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm shadow-sm transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>তথ্য আপডেট করুন</span>
            </Link>
          </div>

          <hr className="border-gray-100" />

          {/* User Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-semibold text-gray-400 block mb-1">
                পুরো নাম
              </span>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-green-700" />
                <span>{user.name || 'তথ্য নেই'}</span>
              </div>
            </div>

            <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-semibold text-gray-400 block mb-1">
                ইমেইল অ্যাড্রেস
              </span>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-700" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>

            <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-semibold text-gray-400 block mb-1">
                অ্যাকাউন্ট স্ট্যাটাস
              </span>
              <div className="text-sm font-bold text-emerald-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>সক্রিয় (ভেরিফাইড)</span>
              </div>
            </div>

            <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-semibold text-gray-400 block mb-1">
                যোগদানের তারিখ
              </span>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-700" />
                <span>{createdAtFormatted}</span>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 text-sm font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>সাইন আউট করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
