import { cache } from 'react';

import { api } from '@axios';

import { toast } from '@components/ui/shadcn/toast/use-toast';

import { parseCookies } from 'nookies';
import {
  Products,
  CustomersResponse,
  OrdersStatusResponse,
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

export const getProducts = cache(async () => {
  try {
    const { data } = await api.get<Products>('/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message);
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
