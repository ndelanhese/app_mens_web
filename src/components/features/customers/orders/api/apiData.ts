import { api } from '@axios';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { parseCookies } from 'nookies';
import { cache } from 'react';

import {
  CustomersResponse,
  OrdersStatusResponse,
  Products,
  UsersResponse,
} from './apiData.types';

const { token } = parseCookies();

export const getCustomers = cache(async () => {
  try {
    const { data } = await api.get<CustomersResponse>('/customers', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar clientes',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});

export const getUsers = cache(async () => {
  try {
    const { data } = await api.get<UsersResponse>('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar funcionário',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});

export const getProducts = cache(async () => {
  try {
    const { data } = await api.get<Products>('/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar os produtos',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});

export const getStatus = cache(async () => {
  try {
    const { data } = await api.get<OrdersStatusResponse>('/orders/status', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar status',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});
