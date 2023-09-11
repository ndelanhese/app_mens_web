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

export type ProductFormProps = {
  handleCloseModal: () => void;
};
