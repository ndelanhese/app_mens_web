export type Role = {
  id: number;
  name: string;
  description: string;
};

export type RolesTableProps = {
  rows: Array<Role>;
};
