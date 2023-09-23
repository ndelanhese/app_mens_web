type AddressResponse = {
  address: string;
  number: string;
  district: string;
  postal_code: string;
  city: string;
  state: string;
};

export type Employee = {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birthDate: string;
  phone: string;
  pisPasep: string;
  admissionDate: string;
  resignationDate: string | null;
  status: string;
  address: AddressResponse[] | [];
};

export type EmployeesTableProps = {
  rows: Array<Employee>;
};
