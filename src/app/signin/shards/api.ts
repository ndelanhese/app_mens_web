import { api } from '@axios';
import { parseCookies, setCookie } from 'nookies';

import { ProductsStockResponse, SigninResponse } from './api.types';

export const signin = async (email: string, password: string) => {
  const { data } = await api.post<SigninResponse>('/auth/login', {
    email,
    password,
  });

  const permissions = JSON.stringify(data.permissions);
  const splitIndex = Math.floor(permissions.length / 2);

  const firstPermissions = permissions.slice(0, splitIndex);
  const secondPermissions = permissions.slice(splitIndex, permissions.length);

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 24);
  const expirationTimeInSeconds = Math.floor(
    (currentDate.getTime() - Date.now()) / 1000,
  );

  setCookie(null, 'token', data.token, {
    maxAge: expirationTimeInSeconds,
    path: '/',
  });
  setCookie(null, 'user', JSON.stringify(data.user_data), {
    maxAge: expirationTimeInSeconds,
    path: '/',
  });
  setCookie(null, 'permission_one', firstPermissions, {
    maxAge: expirationTimeInSeconds,
    path: '/',
  });
  setCookie(null, 'permission_two', secondPermissions, {
    maxAge: expirationTimeInSeconds,
    path: '/',
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
