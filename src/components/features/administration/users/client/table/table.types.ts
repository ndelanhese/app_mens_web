type Employee = {
  id: number;
  name: string;
  cpf: string;
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
  email: string;
  phone: string;
  user: string;
  status: string;
  employee: Employee;
  user_roles: Array<role>;
  permissions: Array<permission>;
};

export type UserTableProps = {
  rows: Array<User>;
};
