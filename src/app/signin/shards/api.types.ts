export type ProductStock = {
  id: number;
  name: string;
  part_number: string;
  description: string;
  quantity: number;
};

export type ProductsStockResponse = {
  data: Array<ProductStock> | [];
};
