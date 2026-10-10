import { Product, Category } from './types';

const BASE_URL_1 = 'https://api.api-store.workers.dev/api/bazardor';
const BASE_URL_2 = 'https://api.abcz.workers.dev/api/bazardor';

async function fetchFromApi<T>(path: string): Promise<T> {
  const urls = [`${BASE_URL_1}${path}`, `${BASE_URL_2}${path}`];
  let lastError: unknown = null;

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          'Accept': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        return data as T;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(`Failed to fetch from API endpoints for ${path}: ${lastError}`);
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchFromApi<Category[]>('/categories');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch a single category by slug
 */
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const categories = await getCategories();
    const found = categories.find((c) => c.slug === slug || c.id === slug);
    if (found) return found;

    const data = await fetchFromApi<Category>(`/categories/${slug}`);
    return data && data.slug ? data : null;
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch products (optionally filtered by category)
 */
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
    const data = await fetchFromApi<Product[]>(endpoint);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch a single product by slug or id
 */
export async function getProductBySlug(slugOrId: string | number): Promise<Product | null> {
  try {
    const str = slugOrId.toString();

    // If it's numeric, we can query by id directly
    if (/^\d+$/.test(str)) {
      try {
        const product = await fetchFromApi<Product>(`/products/${str}`);
        if (product && product.id) return product;
      } catch {
        // Fall back to listing search
      }
    }

    // Otherwise, fetch all products and find matching slug or id
    const products = await getProducts();
    const found = products.find((p) => p.slug === str || p.id.toString() === str);
    return found || null;
  } catch (error) {
    console.error(`Error fetching product ${slugOrId}:`, error);
    return null;
  }
}
