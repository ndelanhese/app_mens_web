import { api } from '@axios';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { parseCookies } from 'nookies';
import { cache } from 'react';

import {
  Products,
  PromotionDiscountTypeResponse,
  PromotionsCategoriesResponse,
  PromotionStatusResponse,
} from './apiData.types';

const { token } = parseCookies();

export const getCategories = cache(async () => {
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
});

export const getStatus = cache(async () => {
  try {
    const { data } = await api.get<PromotionStatusResponse>(
      '/promotions/status',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
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
    const { data } = await api.get<PromotionDiscountTypeResponse>(
      '/promotions/discount-types',
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

export const getProducts = cache(async () => {
  try {
    const { data } = await api.get<Products>('/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch {}
});
