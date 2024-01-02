export type Employee = {
  id: number;
  name: string;
  cpf: string;
  phone: string;
};

export type EmployeeFormProps = {
  handleCloseModal: () => void;
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
