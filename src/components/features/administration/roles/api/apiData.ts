import { api } from '@axios';

import { toast } from '@components/ui/shadcn/toast/use-toast';

import { parseCookies } from 'nookies';
import { PermissionsResponse } from './apiData.types';

const { token } = parseCookies();

export const getPermissions = async () => {
  try {
    const { data } = await api.get<PermissionsResponse>('/acl/permissions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar permissões',
      description: errorMessage,
      variant: 'destructive',
    });
  }
};
