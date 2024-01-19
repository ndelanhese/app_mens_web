import { api } from '@axios';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { Customers } from './page.types';

export const revalidate = 3600;

export const getCustomers = cache(async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Customers>('/customers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message);
  }
});
