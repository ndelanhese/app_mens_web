type AddressResponse = {
  id: number;
  address: string;
  number: string;
  district: string;
  postalCode: string;
  city: string;
  state: string;
};

export type Supplier = {
  id: number;
  contactName: string;
  corporateName: string;
  cnpj: string;
  status: string;
  addresses: AddressResponse[] | [];
};

export type SuppliersTableProps = {
  rows: Array<Supplier>;
};
