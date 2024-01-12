type AddressResponse = {
  id: number;
  address: string;
  number: string;
  district: string;
  postal_code: string;
  city: string;
  state: string;
};

export type CustomerResponse = {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  addresses: AddressResponse[];
};

export type CustomerTable = {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  addresses: AddressResponse[] | [];
};

export type CustomerFormProps = {
  handleCloseModal: () => void;
  customer: CustomerTable | undefined;
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
