export type Product = {
  id: number;
  name: string;
  partNumber: string;
  description: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  category: string;
  brand: string;
};

export type Category = {
  id: number;
  name: string;
};

export type CategoriesResponse = {
  data: Category[];
};

export type Brand = {
  id: number;
  name: string;
};

export type BrandsResponse = {
  data: Brand[];
};

export type ProductFormProps = {
  getProductFunction: () => Product | undefined;
  handleCloseModal: () => void;
};
