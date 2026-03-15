export type ProductCategory =
  | 'bags'
  | 'travel-duffles'
  | 'wallets'
  | 'coin-pouches'
  | 'accessories';

export interface ProductImage {
  src: string;
  alt: string;
  priority?: boolean;
}

export interface ProductDimensions {
  height: string;
  width: string;
  depth?: string;
  unit: 'cm' | 'in';
}

export interface Tannery {
  name: string;
  url?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  currency: string;
  description: string;
  material: string;
  construction: string;
  dimensions: ProductDimensions;
  images: ProductImage[];
  tannery?: Tannery[];
}
