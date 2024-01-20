import { api } from '@axios';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { parseCookies } from 'nookies';
import { cache } from 'react';

import {
  GetReportProps,
  OverviewResponse,
  ReportsResponseData,
} from './api.types';

const { token } = parseCookies();

export const getOverview = cache(async () => {
  try {
    const { data } = await api.get<OverviewResponse>('/summaries/overview', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar dados de overview',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});

export const getProductsReport = cache(
  async ({
    direction,
    final_date: finalDate,
    initial_date: initialDate,
    page,
    per_page: perPage,
  }: GetReportProps) => {
    try {
      const { data } = await api.get<ReportsResponseData>(
        `/summaries/top-selling-products?page=${page ?? ''}&per_page=${perPage ?? ''}&initial_date=${initialDate ?? ''}&final_date=${finalDate ?? ''}&direction=${direction ?? 'DESC'}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao buscar relatório de produtos',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  },
);

export const getMethodsOfPaymentsReport = cache(
  async ({
    direction,
    final_date: finalDate,
    initial_date: initialDate,
    page,
    per_page: perPage,
  }: GetReportProps) => {
    try {
      const { data } = await api.get<ReportsResponseData>(
        `/summaries/top-payment-methods?page=${page ?? ''}&per_page=${perPage ?? ''}&initial_date=${initialDate ?? ''}&final_date=${finalDate ?? ''}&direction=${direction ?? 'DESC'}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao buscar relatório de métodos de pagamentos',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  },
);

export const getTopCategoriesReport = cache(
  async ({
    direction,
    final_date: finalDate,
    initial_date: initialDate,
    page,
    per_page: perPage,
  }: GetReportProps) => {
    try {
      const { data } = await api.get<ReportsResponseData>(
        `/summaries/top-products-categories?page=${page ?? ''}&per_page=${perPage ?? ''}&initial_date=${initialDate ?? ''}&final_date=${finalDate ?? ''}&direction=${direction ?? 'DESC'}&order=quantity`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao buscar relatório de categorias',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  },
);

export const getTopBrandsReport = cache(
  async ({
    direction,
    final_date: finalDate,
    initial_date: initialDate,
    page,
    per_page: perPage,
  }: GetReportProps) => {
    try {
      const { data } = await api.get<ReportsResponseData>(
        `/summaries/top-products-brands?page=${page ?? ''}&per_page=${perPage ?? ''}&initial_date=${initialDate ?? ''}&final_date=${finalDate ?? ''}&direction=${direction ?? 'DESC'}&order=quantity`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao buscar relatório de marcas',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  },
);
