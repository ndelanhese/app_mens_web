type SaleProduct = {
  id: number;
  part_number: string;
  name: string;
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

type MethodOfPayment = {
  id: number;
  installment: number;
  method: {
    id: number;
    name: string;
  };
};

export type DiscountType = 'percentage' | 'fixed';

export type Sale = {
  id: number;
  date: string;
  description: string;
  observation: string;
  status: string;
  customer: Customer;
  employee: Employee;
  products: SaleProduct[];
  final_value: number;
  formatted_final_value: number;
  total_value: number;
  methods_of_payments: MethodOfPayment[];
  discount_amount: number;
  discount_type: DiscountType;
  formatted_discount: string;
};

export type Sales = {
  data: Sale[];
};
