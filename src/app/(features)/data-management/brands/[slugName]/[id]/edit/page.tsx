import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { api } from '@axios';

import { Brand, BrandsPageSearchParams } from './page.types';

const getBrandsData = async (id: string | undefined) => {
  if (!id) return redirect('/not-found');

  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data: response } = await api.get<Brand>(`/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: Error | any) {
    redirect('/not-found');
  }
};

export const generateMetadata = async ({ params }: BrandsPageSearchParams) => {
  const brandsData = await getBrandsData(params.id);
  return {
    title: brandsData.name,
  };
};

const BrandPage = async ({ params }: BrandsPageSearchParams) => {
  const brandsData = await getBrandsData(params.id);
  return (
    <div className="flex w-full items-center justify-center">
      <h1>{JSON.stringify(brandsData)}</h1>
    </div>
  );
};

export default BrandPage;
