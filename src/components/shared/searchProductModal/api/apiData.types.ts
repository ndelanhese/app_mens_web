export type Product = {
  id: number;
  name: string;
  part_number: string;
  description: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  supplier: {
    id: number;
    corporate_name: string;
  };
};

export type Products = {
  data: Product[];
};