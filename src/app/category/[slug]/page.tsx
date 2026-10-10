import React from 'react';
import { Metadata } from 'next';
import { getCategory, getProducts, getCategories } from '@/lib/api';
import CategoryView from './CategoryView';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'ক্যাটাগরি পাওয়া যায়নি — বাজার দর',
    };
  }

  return {
    title: `${category.icon || ''} ${category.nameBn} এর বাজার দর — বাজার দর`,
    description: `${category.nameBn} পণ্যের বর্তমান দাম, পরিবর্তন ও বিস্তারিত বাজারদর।`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  return (
    <CategoryView
      category={category}
      initialProducts={products}
      slug={slug}
    />
  );
}
