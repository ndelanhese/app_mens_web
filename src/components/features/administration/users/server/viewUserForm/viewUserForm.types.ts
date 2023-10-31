type Employee = {
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

type User = {
  id: number;
  user: string;
  email: string;
  status: string;
  employee: Employee;
  user_roles: Array<role>;
  permissions: Array<permission>;
};

export type UserData = {
  user: User | undefined;
};
