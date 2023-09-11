export type Brand = {
  id: number;
  name: string;
};

export type BrandFormProps = {
  getBrandFunction: () => Brand | undefined;
  handleCloseModal: () => void;
};
