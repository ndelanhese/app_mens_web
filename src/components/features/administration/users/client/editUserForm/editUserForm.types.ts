type Employee = {
  name: string;
  cpf: string;
};

export type UserData = {
  user: {
    id: number;
    user: string;
    email: string;
    status: string;
    employee: Employee;
    users_roles: Array<number>;
    permissions: Array<number>;
  };
};
