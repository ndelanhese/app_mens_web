export type PromotionCategory = {
  id: number;
  name: string;
};

export type PromotionsCategoriesResponse = {
  data: PromotionCategory[];
};

export type Status = {
  key: string;
  value: string;
};

export type DiscountTypeEnum = 'percentage' | 'fixed';

export type DiscountType = {
  key: string;
  value: string;
};

export type PromotionStatusResponse = Status[];

export type PromotionDiscountTypeResponse = DiscountType[];

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
