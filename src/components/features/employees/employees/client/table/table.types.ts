export type Employee = {
  id: number;
  name: string;
  cpf: string;
  phone: string;
};

export type EmployeesTableProps = {
  rows: Array<Employee>;
};
