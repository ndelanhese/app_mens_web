import { ReactNode } from 'react';

import { RefModalProps } from '@/components/shared/table/table.types';

type Category = {
  id: number;
  name: string;
};
type Brand = {
  id: number;
  name: string;
};
type Supplier = {
  id: number;
  corporate_name: string;
};

export type Product = {
  id: number;
  name: string;
  partNumber: string;
  description: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
  category: Category;
  brand: Brand;
  supplier: Supplier;
};

export type SearchProductModalProps = {
  triggerText?: string;
  triggerIcon?: ReactNode;
  modalRef?: (ref: RefModalProps) => void | undefined;
  title?: string;
  description?: string;
  handleRowClick: (row: Product) => void;
  handleCloseModal?: () => void;
};
