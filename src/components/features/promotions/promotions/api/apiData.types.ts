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
