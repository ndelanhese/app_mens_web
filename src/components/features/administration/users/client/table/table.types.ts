export type User = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
};

export type UserTableProps = {
  rows: Array<User>;
};
