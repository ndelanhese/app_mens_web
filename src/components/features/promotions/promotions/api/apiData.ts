import { api } from '@axios';

import { toast } from '@components/ui/shadcn/toast/use-toast';

import { parseCookies } from 'nookies';
import {
  PromotionDiscountTypeResponse,
  PromotionStatusResponse,
  PromotionsCategoriesResponse,
} from './apiData.types';

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

export const getStatus = async () => {
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
};

export const getDiscountType = async () => {
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
};
