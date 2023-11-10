export type Role = {
  id: number;
  name: string;
  description: string;
};

export type CreateRoleFormProps = {
  handleCloseModal: () => void;
};
