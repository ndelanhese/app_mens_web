type Category = {
  id: number;
  name: string;
};

type Brand = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  partNumber: string;
  description: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  category: Category;
  brand: Brand;
};

export type ProductPreviewProps = {
  product: Product | undefined;
};
