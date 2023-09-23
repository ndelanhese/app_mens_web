import { toast } from '@/components/ui/shadcn/toast/use-toast';
import { api } from '@/services/axios';

import {
  StatesResponse,
  CitiesResponse,
  EmployeeResponse,
} from './apiData.types';
import { parseCookies } from 'nookies';

const { token } = parseCookies();

export const getStates = async () => {
  try {
    const { data } = await api.get<StatesResponse>('/states', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error: Error | any) {
    const errorMessage = error.response.data.message ?? 'Erro desconhecido';
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
    const errorMessage = error.response.data.message ?? undefined;
    toast({
      title: 'Erro ao buscar cidades',
      description: errorMessage,
      variant: 'destructive',
    });
  }
};

export const getEmployee = async (id: number) => {
  try {
    const { data } = await api.get<EmployeeResponse>(`/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: Error | any) {
    const errorMessage = error.response.data.message ?? undefined;
    toast({
      title: 'Erro ao buscar funcionário',
      description: errorMessage,
      variant: 'destructive',
    });
  }
};