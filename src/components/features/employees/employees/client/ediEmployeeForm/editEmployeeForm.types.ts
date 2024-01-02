type AddressResponse = {
  address: string;
  number: string;
  district: string;
  postalCode: string;
  city: string;
  state: string;
};

export type EmployeeResponse = {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  pis_pase: string;
  admission_date: string;
  resignation_date: string;
  addresses: AddressResponse[];
};

export type EmployeeTable = {
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
  addresses: AddressResponse[] | [];
};

export type EmployeeFormProps = {
  handleCloseModal: () => void;
  employee: EmployeeTable | undefined;
};

export type CityResponse = {
  name: string;
  is_municipality: boolean;
  name_with_municipality: string;
};

export type CitiesResponse = {
  data: CityResponse[];
};

export type StateResponse = {
  value: string;
  label: string;
};

export type StatesResponse = {
  data: StateResponse[];
};
