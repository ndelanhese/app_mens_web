export type Product = {
  id: number;
  part_number: string;
  name: string;
  price: number;
  quantity: number;
};

export type Promotion = {
  id: number;
  name: string;
  description: string;
  discount: string;
  discount_amount: number;
  formatted_discount: string;
  initialDate: string;
  finalDate: string;
  status: string;
  category: string;
  products: Product[];
  productsList: string;
};

export type PromotionsTableProps = {
  rows: Array<Promotion>;
};
