export type Customer = {
  id: number;
  name: string;
  cpf: string;
};

export type CustomersResponse = {
  data: Customer[];
};

export type Employee = {
  name: string;
  cpf: string;
};

export type User = {
  id: number;
  employee: Employee;
};

export type UsersResponse = {
  data: User[];
};

export type Product = {
  id: number;
  name: string;
  part_number: string;
  description: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  supplier: {
    id: number;
    corporate_name: string;
  };
};

export type Products = {
  data: Product[];
};

export type Status = {
  value: string;
  label: string;
};

export type OrdersStatusResponse = Status[];