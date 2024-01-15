import { cookies } from 'next/headers';
import { cache } from 'react';
import { Metadata } from 'next';

import { api } from '@axios';

import { PromotionsTable } from '@components/features/promotions/promotions/client/table/table';

import { PromotionsResponse } from './page.types';

const iterateResponse = (promotions?: PromotionsResponse) => {
  if (!promotions) return [];
  return promotions?.data?.map(promotion => ({
    id: promotion?.id,
    name: promotion?.name,
    description: promotion?.description,
    discount: promotion?.formatted_discount,
    discount_amount: promotion?.discount_amount,
    formatted_discount: promotion?.formatted_discount,
    initialDate: promotion?.initial_date,
    finalDate: promotion?.final_date,
    status: promotion?.status,
    category: promotion?.category?.name,
    products: promotion?.products,
    productsList: promotion?.products?.map(product => product?.name).join(', ')
      ? promotion?.products?.map(product => product?.name).join(', ').length >
        25
        ? promotion?.products
            ?.map(product => product?.name)
            .join(', ')
            .substring(0, 25) + '...'
        : promotion?.products?.map(product => product?.name).join(', ')
      : '',
  }));
};

const getPromotions = cache(async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<PromotionsResponse>('/promotions', {
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
