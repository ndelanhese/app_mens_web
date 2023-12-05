import { api } from '@axios';

import { toast } from '@components/ui/shadcn/toast/use-toast';

import { parseCookies } from 'nookies';
import { PromotionsCategoriesResponse } from './apiData.types';

const { token } = parseCookies();

export const getCategories = async () => {
  try {
    const { data } = await api.get<PromotionsCategoriesResponse>(
      '/promotions-categories',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data.data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar categorias',
      description: errorMessage,
      variant: 'destructive',
    });
  }
};
