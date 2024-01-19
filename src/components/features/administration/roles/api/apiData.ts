import { api } from '@axios';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { parseCookies } from 'nookies';
import { cache } from 'react';

import { PermissionsResponse, RolesResponse } from './apiData.types';

const { token } = parseCookies();

export const getPermissions = cache(async () => {
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
});

export const getRole = cache(async (roleId: number | undefined) => {
  try {
    const { data } = await api.get<RolesResponse>(`/acl/roles/${roleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: Error | any) {
    const errorMessage = error?.response?.data?.message ?? 'Erro desconhecido';
    toast({
      title: 'Erro ao buscar papel',
      description: errorMessage,
      variant: 'destructive',
    });
  }
});
