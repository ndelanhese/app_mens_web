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
  initialDate: string;
  finalDate: string;
  status: string;
  category: string;
  products: Product[];
  productsList: string;
};
export type PromotionPreviewProps = {
  promotion: Promotion | undefined;
};
