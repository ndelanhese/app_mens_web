export type CityResponse = {
  name: string;
  isMunicipality: boolean;
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
