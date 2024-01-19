import { api } from '@axios';
import { cookies } from 'next/headers';

import { Roles } from './page.types';

export const getRoles = async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Roles>('/acl/roles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch {}
};
