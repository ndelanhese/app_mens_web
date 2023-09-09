type Employee = {
  name: string;
  cpf: string;
};

export type User = {
  id: number;
  user: string;
  email: string;
  status: string;
  employee: Employee;
  users_roles: Array<number>;
  permissions: Array<number>;
};

export type UserPageSearchParams = {
  params: { slugName: string; id: string };
};
