import { products } from './products';
import type { Product, ProductCategory } from './types';

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map(p => p.slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 3);
}

export function getAdjacentProducts(product: Product): { prev: Product | null; next: Product | null } {
  const siblings = products.filter(p => p.category === product.category);
  const idx  = siblings.findIndex(p => p.id === product.id);
  return {
    prev: idx > 0 ? siblings[idx - 1] : null,
    next: idx < siblings.length - 1 ? siblings[idx + 1] : null,
  };
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
