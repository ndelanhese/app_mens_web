export type Promotion = {
  id: number;
  name: string;
};

export type PromotionFormProps = {
  handleCloseModal: () => void;
};

export type PromotionCategory = {
  id: number;
  name: string;
};

export type CategoriesResponse = {
  data: PromotionCategory[];
};

export type Product = {
  id: number;
  part_number: string;
  name: string;
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
  price: number;
  size: string;
  color: string;
  quantity: number;
  category: Category;
  brand: Brand;
  supplier: Supplier;
};
