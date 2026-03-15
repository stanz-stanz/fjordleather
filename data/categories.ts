import type { ProductCategory } from './types';

export interface CategoryMeta {
  id: ProductCategory;
  label: string;
  description: string;
}

export const categories: CategoryMeta[] = [
  { id: 'bags',           label: 'Bags',           description: 'Structured leather carry' },
  { id: 'travel-duffles', label: 'Travel Duffles',  description: 'Built for the long journey' },
  { id: 'wallets',        label: 'Wallets',         description: 'The essentials, refined' },
  { id: 'coin-pouches',   label: 'Coin Pouches',    description: 'Small form, lasting character' },
  { id: 'accessories',    label: 'Accessories',     description: 'Straps, belts, and more' },
];

