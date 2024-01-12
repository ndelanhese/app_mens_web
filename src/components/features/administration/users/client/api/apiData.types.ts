export type Employee = {
  id: number;
  name: string;
  cpf: string;
};

export type EmployeesResponse = {
  data: Employee[];
};

export type Role = {
  id: number;
  description: string;
};

export type RolesResponse = {
  data: Role[];
};

export type PermissionsGroup = {
  group_name: string;
  permissions: Array<{
    id: number;
    description: string;
  }>;
};

export type PermissionsResponse = {
  data: PermissionsGroup[];
};
