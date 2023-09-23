export type DiscountType = 'percentage' | 'fixed';

export type PromotionCategory = {
  id: number;
  name: string;
};

// export type PromotionProducts = {};

export type Promotion = {
  id: number;
  name: string;
  description: string;
  discount_amount: number;
  discount_type: DiscountType;
  initial_date: string;
  final_date: string;
  status: string;
  category: PromotionCategory;
  products: Array<{
    product: {
      id: number;
      part_number: string;
      name: string;
      price: number;
      quantity: number;
    };
  }>;
};

export type Promotions = {
  data: Promotion[];
};
