type AddressResponse = {
  id: number;
  address: string;
  number: string;
  district: string;
  postal_code: string;
  city: string;
  state: string;
};

export type Customer = {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  addresses: AddressResponse[] | [];
};

export type CustomersTableProps = {
  rows: Array<Customer>;
};