type Employee = {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  pis_pasep: string;
  admission_date: string;
  resignation_date: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type role = {
  id: number;
  name: string;
};

type permission = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  user: string;
  email: string;
  status: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  user_roles: Array<role>;
  permissions: Array<permission>;
};

export type Users = {
  data: User[];
};
