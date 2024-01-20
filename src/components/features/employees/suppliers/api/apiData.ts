import { api } from '@axios';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { parseCookies } from 'nookies';

import { CitiesResponse, StatesResponse } from './apiData.types';

const { token } = parseCookies();

export const getStates = async () => {
  try {
    const { data } = await api.get<StatesResponse>('/states', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar estados',
      description: errorMessage,
      variant: 'destructive',
    });
  }
};

export const getCities = async (state: string) => {
  try {
    const { data } = await api.get<CitiesResponse>(`/cities?uf=${state}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? undefined;
    toast({
      title: 'Erro ao buscar cidades',
      description: errorMessage,
      variant: 'destructive',
    });
  }
};
