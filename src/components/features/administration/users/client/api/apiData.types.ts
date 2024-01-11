export type Employee = {
  id: number;
  name: string;
  cpf: string;
};

export type EmployeesResponse = {
  data: Employee[];
};
