export type Employee = {
  id: number;
  name: string;
  cpf: string;
  phone: string;
};

export type EmployeePreviewProps = {
  employee: Employee | undefined;
};
