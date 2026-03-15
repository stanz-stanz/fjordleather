import type { ProductCategory } from './types';

export interface CategoryMeta {
  id: ProductCategory;
  label: string;
  description: string;
}

export const categories: CategoryMeta[] = [
  { id: 'bags',           label: 'Bags',           description: 'Structured leather carry' },
  { id: 'wallets',        label: 'Wallets',         description: 'The essentials, refined' },
];

