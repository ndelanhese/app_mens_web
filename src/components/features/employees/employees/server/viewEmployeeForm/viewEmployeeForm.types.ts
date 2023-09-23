type Address = {
  address: string;
  number: string;
  district: string;
  postalCode: string;
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
  addresses: Address[] | [];
};

export type EmployeePreviewProps = {
  employee: Employee | undefined;
};
