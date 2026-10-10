'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { User, ArrowLeft, Loader2, Save } from 'lucide-react';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error('তথ্য পরিবর্তন করতে প্রথমে সাইন ইন করুন');
      router.push('/signin?redirect=/profile/update');
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      const err = 'অনুগ্রহ করে একটি নাম লিখুন';
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setLoading(true);
    try {
      // Follows BetterAuth documentation: authClient.updateUser({ name })
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        const msg = res.error.message || 'তথ্য আপডেট করতে সমস্যা হয়েছে';
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        toast.success('আপনার নাম সফলভাবে আপডেট করা হয়েছে!');
        router.push('/profile');
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'তথ্য আপডেট করতে ব্যর্থ হয়েছে';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-green-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-3 text-2xl shadow-xs">
            👤
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              নাম (Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50/50 rounded-xl border border-gray-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all font-semibold"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              বর্তমান ইমেইল: <span className="font-medium text-gray-600">{session.user.email}</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>আপডেট হচ্ছে…</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Update Information</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
