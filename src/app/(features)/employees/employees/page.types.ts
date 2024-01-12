type Address = {
  id: number;
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
  birth_date: string;
  phone: string;
  pis_pasep: string;
  admission_date: string;
  resignation_date: string | null;
  status: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
};

export type Employees = {
  data: Employee[];
};
