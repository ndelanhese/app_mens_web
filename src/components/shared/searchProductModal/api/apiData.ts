import { cache } from 'react';

import { api } from '@axios';

import { toast } from '@components/ui/shadcn/toast/use-toast';

import { parseCookies } from 'nookies';
import { Products } from './apiData.types';

const { token } = parseCookies();

export const getProducts = async () => {
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
      title: 'Erro ao buscar produtor',
      description: errorMessage,
      variant: 'destructive',
    });
  }
};
