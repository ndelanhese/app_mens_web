type Brand = {
  id: number;
  name: string;
};

type Category = {
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
  price: number;
  size: string;
  final_price?: string;
  price_formatted: string;
  color: string;
  quantity: number;
  category: Category;
  brand: Brand;
  supplier: Supplier;
};

export type ProductsTableProps = {
  rows: Array<Product>;
};
