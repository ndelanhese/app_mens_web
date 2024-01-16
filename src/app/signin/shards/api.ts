import { api, nextApi } from '@axios';

import { ProductsStockResponse } from './api.types';
import { parseCookies } from 'nookies';

export const signin = async (email: string, password: string) => {
  return await nextApi.post('/auth/signin', {
    email,
    password,
  });
};

export const getProductsStock = async () => {
  const { token } = parseCookies();
  const { data } = await api.get<ProductsStockResponse>(
    '/products/stock?page=1&per_page=9999&status=active&limit=3',
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};
