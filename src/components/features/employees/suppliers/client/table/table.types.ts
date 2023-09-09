export type Supplier = {
  contactName: string;
  corporateName: string;
  cnpj: string;
};

export type SuppliersTableProps = {
  rows: Array<Supplier>;
};
