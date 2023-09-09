export type Supplier = {
  id: number;
  contact_name: string;
  corporate_name: string;
  cnpj: string;
};

export type Suppliers = {
  data: Supplier[];
};
