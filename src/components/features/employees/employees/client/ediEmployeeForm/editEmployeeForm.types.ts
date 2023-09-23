type AddressResponse = {
  address: string;
  number: string;
  district: string;
  postal_code: string;
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
  address: AddressResponse[];
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
  address: AddressResponse[] | [];
};

export type EmployeeFormProps = {
  handleCloseModal: () => void;
  employee: EmployeeTable | undefined;
};

export type CityResponse = {
  name: string;
  isMunicipality: boolean;
  name_with_municipality: string;
};

export type CitiesResponse = {
  data: CityResponse[];
};

export type StateResponse = {
  key: string;
  value: string;
};

export type StatesResponse = {
  data: StateResponse[];
};
