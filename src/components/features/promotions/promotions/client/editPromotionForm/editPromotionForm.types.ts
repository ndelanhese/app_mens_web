export type Promotion = {
  id: number;
  name: string;
};

export type PromotionFormProps = {
  handleCloseModal: () => void;
  promotion: Promotion | undefined;
};
