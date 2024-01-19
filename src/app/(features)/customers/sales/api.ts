import { api } from '@axios';
import { cookies } from 'next/headers';

import { Sales } from './page.types';

export const getSales = async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Sales>('/sales', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message);
  }
};
