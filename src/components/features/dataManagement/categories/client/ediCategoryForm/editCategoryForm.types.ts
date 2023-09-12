export type Category = {
  id: number;
  name: string;
};

export type CategoryFormProps = {
  getCategoryFunction: () => Category | undefined;
  handleCloseModal: () => void;
};
