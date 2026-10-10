import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import ToastProvider from '@/components/ToastProvider';
import { getCategories, getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে',
  description: 'বাংলাদেশি নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম, বাজারভিত্তিক তুলনামূলক বিশ্লেষণ এবং দামের ওঠানামার লাইভ ট্র্যাকার।',
  icons: {
    icon: '/logo-icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <ToastProvider />
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
