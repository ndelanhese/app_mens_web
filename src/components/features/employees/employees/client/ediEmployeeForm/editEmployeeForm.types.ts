export type Employee = {
  id: number;
  name: string;
  cpf: string;
  phone: string;
};

export type EmployeeFormProps = {
  getEmployeesFunction: () => Employee | undefined;
  handleCloseModal: () => void;
};
