import { api } from '@axios';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { parseCookies } from 'nookies';
import { cache } from 'react';

import {
  CustomersResponse,
  OrdersStatusResponse,
  Products,
  SalesDiscountTypeResponse,
  SalesMethodsOfPaymentsResponse,
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
    const { data } = await api.get<OrdersStatusResponse>('/sales/status', {
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

export const getDiscountType = cache(async () => {
  try {
    const { data } = await api.get<SalesDiscountTypeResponse>(
      '/sales/discount-types',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar tipos de desconto',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});

export const getMethodsOfPayments = cache(async () => {
  try {
    const { data } = await api.get<SalesMethodsOfPaymentsResponse>(
      '/sales/methods-of-payments',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar métodos de pagamento',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});
