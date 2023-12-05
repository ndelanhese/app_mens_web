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
