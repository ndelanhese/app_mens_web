export type SupplierFormProps = {
  handleCloseModal: () => void;
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
