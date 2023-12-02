export type Promotion = {
  id: number;
  name: string;
};

export type PromotionPreviewProps = {
  promotion: Promotion | undefined;
};
