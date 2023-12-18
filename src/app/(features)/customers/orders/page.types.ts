type Employee = {
  id: number;
  name: string;
  cpf: string;
};

export type User = {
  id: number;
  employee: Employee;
};

type Customer = {
  id: number;
  name: string;
  cpf: string;
  rg: string | null;
};

export type Order = {
  id: number;
  date: string;
  description: string;
  observation: string;
  status: string;
  customer: Customer;
  user: User;
};

export type Orders = {
  data: Order[];
};
