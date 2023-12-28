export type Category = {
  id: number;
  name: string;
};

export type Brand = {
  id: number;
  name: string;
};

export type Supplier = {
  id: number;
  corporate_name: string;
};

export type ComboboxOption = {
  value: string;
  label: string;
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
  supplier: Supplier;
};

export type CategoriesResponse = {
  data: Category[];
};

export type BrandsResponse = {
  data: Brand[];
};

export type SuppliersResponse = {
  data: Supplier[];
};

export type ProductFormProps = {
  handleCloseModal: () => void;
  product: Product | undefined;
};
