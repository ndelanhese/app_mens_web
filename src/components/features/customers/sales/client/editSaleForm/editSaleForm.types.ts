import { Sale } from '../table/table.types';

export type SaleFormProps = {
  handleCloseModal: () => void;
  sale: Sale | undefined;
};

export type Customer = {
  id: number;
  name: string;
  cpf: string;
};

export type Status = {
  key: string;
  value: string;
};

export type Product = {
  id: number;
  part_number: string;
  name: string;
  qty: number;
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
