export type Employee = {
  id: number;
  name: string;
  cpf: string;
  phone: string;
};

export type EmployeeFormProps = {
  handleCloseModal: () => void;
};
