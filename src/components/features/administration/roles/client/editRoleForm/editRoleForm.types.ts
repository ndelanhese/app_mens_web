export type Role = {
  id: number;
  name: string;
  description: string;
};

export type EditRoleFormProps = {
  role: Role | undefined;
  handleCloseModal: () => void;
};
