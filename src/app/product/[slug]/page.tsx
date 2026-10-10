import React from 'react';
import { Metadata } from 'next';
import { getProductBySlug, getProducts } from '@/lib/api';
import ProductDetailView from './ProductDetailView';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'পণ্য পাওয়া যায়নি — বাজার দর',
    };
  }

  return {
    title: `${product.image || '🛒'} ${product.nameBn} এর আজকের বাজার দর — বাজার দর`,
    description: `${product.nameBn} এর আজকের দাম ${product.today} টাকা। বাজারভিত্তিক বিস্তারিত সর্বনিম্ন, সর্বোচ্চ ও গড় দাম।`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return <ProductDetailView product={product} slug={slug} />;
}
