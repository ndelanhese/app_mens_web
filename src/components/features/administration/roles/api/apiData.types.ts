export type Permission = {
  id: number;
  name: string;
  description: string;
  group: string;
  createdAt: string;
  updatedAt: string;
};

export type PermissionGroup = {
  group_name: string;
  permissions: Permission[];
};

export type PermissionsResponse = {
  data: PermissionGroup[];
};