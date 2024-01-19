import { api } from '@axios';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { parseCookies } from 'nookies';
import { cache } from 'react';

import { OverviewResponse } from './api.types';

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
