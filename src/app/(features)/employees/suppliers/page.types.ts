type Address = {
  id: number;
  address: string;
  number: string;
  district: string;
  postal_code: string;
  city: string;
  state: string;
};

export type Supplier = {
  id: number;
  contact_name: string;
  corporate_name: string;
  cnpj: string;
  status: string;
  addresses: Address[];
};

export type Suppliers = {
  data: Supplier[];
};
