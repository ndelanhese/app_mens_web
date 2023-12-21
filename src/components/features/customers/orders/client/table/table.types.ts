type Employee = {
  id: number;
  name: string;
  cpf: string;
};

type Customer = {
  id: number;
  name: string;
  cpf: string;
  rg: string | null;
};

type OrderProduct = {
  id: number;
  part_number: string;
  name: string;
  description: string;
  size: string;
  color: string;
  quantity: number;
  category_id: number;
  brand_id: number;
  supplier_id: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  purchase_price: number;
  purchase_price_formatted: string;
  price: number;
  price_formatted: string;
};

export type Order = {
  id: number;
  date: string;
  description: string;
  observation: string;
  status: string;
  customer: Customer;
  employee: Employee;
  products: OrderProduct[];
  productsList?: string;
};

export type OrdersTableProps = {
  rows: Array<Order> | [];
};
