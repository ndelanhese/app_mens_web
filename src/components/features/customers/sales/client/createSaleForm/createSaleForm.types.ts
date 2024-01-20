import { RefModalProps } from '@components/shared/table/table.types';
import { ReactNode } from 'react';

export type SaleFormProps = {
  handleCloseModal: () => void;
};

export type Customer = {
  id: number;
  name: string;
  cpf: string;
};

export type Status = {
  value: string;
  label: string;
};

export type Product = {
  id: number;
  part_number: string;
  name: string;
  qty: number;
  value: number;
  value_formatted: string;
  unity_value: number;
  unity_value_formatted: string;
};

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

export type ProductTable = {
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

export type Employee = {
  name: string;
  cpf: string;
};

export type User = {
  id: number;
  employee: Employee;
};

export type DiscountTypeEnum = 'percentage' | 'fixed';

export type DiscountType = {
  value: string;
  label: string;
};

export type MethodOfPayment = {
  id: number;
  name: string;
};

export type CreatableSelects = 'customer' | 'user';

export type NewItemModal = {
  newItemDialogTitle: string;
  newItemDialogDescription: string;
  newItemDialogContent: ReactNode;
  newItemDialogRef: (ref: RefModalProps) => void | undefined;
  newItemName: CreatableSelects;
};
