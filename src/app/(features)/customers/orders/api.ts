import { cookies } from 'next/headers';

import { api } from '@axios';

import { Orders } from './page.types';

export const getOrders = async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Orders>('/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message);
  }
};
