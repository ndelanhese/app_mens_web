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
  price: number;
  price_formatted: string;
  size: string;
  color: string;
  quantity: number;
  category: Category;
  brand: Brand;
  supplier: Supplier;
};

export type ProductPreviewProps = {
  product: Product | undefined;
};
