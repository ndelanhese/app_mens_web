export type ProductStock = {
  id: number;
  name: string;
  part_number: string;
  description: string;
  quantity: number;
};

export type ProductsStockResponse = {
  data: Array<ProductStock> | [];
};

interface Permission {
  id: number;
  name: string;
  description: string;
}

interface UserData {
  name: string;
  email: string;
}

export interface SigninResponse {
  token: string;
  user_data: UserData;
  expires_in: string;
  permissions: Permission[];
}
