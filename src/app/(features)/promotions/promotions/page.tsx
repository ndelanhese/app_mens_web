import { cookies } from 'next/headers';
import { cache } from 'react';
import { Metadata } from 'next';

import { api } from '@axios';
import { PromotionsTable } from '@features-components/promotions/promotions/client/table/table';

import { Promotions } from './page.types';

const iterateResponse = (promotions?: Promotions) => {
  if (!promotions) return [];
  return promotions?.data?.map(promotion => ({
    name: promotion?.name,
    description: promotion?.description,
    discount: String(promotion?.discount_amount),
    initialDate: promotion?.initial_date,
    finalDate: promotion?.final_date,
    status: promotion?.status,
    category: promotion?.category?.name,
    products: promotion?.products?.map(product => product?.name).join(', '),
  }));
};

const getPromotions = cache(async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Promotions>('/promotions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message);
  }
});

export const metadata: Metadata = {
  title: 'Promoções',
};

const Promotions = async () => {
  const promotions = await getPromotions();
  const rows = iterateResponse(promotions);
  return <PromotionsTable rows={rows} />;
};

export default Promotions;
