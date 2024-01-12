import { ReactNode } from 'react';

import { RefModalProps } from '@components/shared/table/table.types';

export type Category = {
  id: number;
  name: string;
};

export type Brand = {
  id: number;
  name: string;
};

export type Supplier = {
  id: number;
  corporate_name: string;
};

export type ComboboxOption = {
  value: string;
  label: string;
};

export type Product = {
  id: number;
  name: string;
  partNumber: string;
  description: string;
  price: number;
  price_formatted: string;
  final_price?: string;
  size: string;
  color: string;
  quantity: number;
  category: Category;
  brand: Brand;
  supplier: Supplier;
};

export type CategoriesResponse = {
  data: Category[];
};

export type BrandsResponse = {
  data: Brand[];
};

export type SuppliersResponse = {
  data: Supplier[];
};

export type ProductFormProps = {
  handleCloseModal: () => void;
  product: Product | undefined;
};

export type CreatableSelects = 'category' | 'brand' | 'supplier';

export type NewItemModal = {
  newItemDialogTitle: string;
  newItemDialogDescription: string;
  newItemDialogContent: ReactNode;
  newItemDialogRef: (ref: RefModalProps) => void | undefined;
  newItemName: CreatableSelects;
};
