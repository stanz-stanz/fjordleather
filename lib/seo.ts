import type { Metadata } from 'next';
import type { Product } from '@/data/types';
import { BRAND_NAME, SITE_URL } from './constants';

export function generateProductMetadata(product: Product): Metadata {
  return {
    title: `${product.name} — ${BRAND_NAME}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0]
        ? [{ url: `${SITE_URL}${product.images[0].src}`, alt: product.images[0].alt }]
        : [],
    },
  };
}
