type AddressResponse = {
  address: string;
  number: string;
  district: string;
  postalCode: string;
  city: string;
  state: string;
};

export type SupplierResponse = {
  id: number;
  contact_name: string;
  corporate_name: string;
  cnpj: string;
  addresses: AddressResponse[];
};

export type SupplierTable = {
  id: number;
  contactName: string;
  corporateName: string;
  cnpj: string;
  status: string;
  addresses: AddressResponse[] | [];
};

export type SupplierFormProps = {
  handleCloseModal: () => void;
  supplier: SupplierTable | undefined;
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
