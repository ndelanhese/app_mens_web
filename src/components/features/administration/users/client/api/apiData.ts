import { cache } from 'react';

import { api } from '@axios';

import { toast } from '@components/ui/shadcn/toast/use-toast';

import { parseCookies } from 'nookies';
import { EmployeesResponse } from './apiData.types';

const { token } = parseCookies();

export const getEmployees = cache(async () => {
  try {
    const { data } = await api.get<EmployeesResponse>('/employees', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar funcionários',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});
