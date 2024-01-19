import { api } from '@axios';
import { CategoriesTable } from '@features-components/promotions/promotionCategories/client/table/table';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { Categories } from './page.types';

const iterateResponse = (categories?: Categories) => {
  if (!categories) return [];
  return categories?.data?.map(category => ({
    id: category.id,
    name: category?.name,
  }));
};

const getCategories = cache(async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Categories>('/promotions-categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch {}
});

export const metadata: Metadata = {
  title: 'Categorias de Promoções',
};

const PromotionCategories = async () => {
  const categories = await getCategories();
  const rows = iterateResponse(categories);
  return <CategoriesTable rows={rows} />;
};

export default PromotionCategories;
