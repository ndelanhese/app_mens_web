import { cookies } from 'next/headers';
import { cache } from 'react';
import { Metadata } from 'next';

import { api } from '@axios';
import { BrandsTable } from '@features-components/dataManagement/brands/client/table/table';

import { Brands } from './page.types';

const iterateResponse = (brands?: Brands) => {
  if (!brands) return [];
  return brands?.data?.map(brand => ({
    id: brand.id,
    name: brand?.name,
  }));
};

const getBrands = cache(async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Brands>('/brands', {
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
  title: 'Marcas',
};

const Brands = async () => {
  const brands = await getBrands();
  const rows = iterateResponse(brands);
  return <BrandsTable rows={rows} />;
};

export default Brands;
