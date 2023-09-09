import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { api } from '@axios';

import { EditBrandForm } from '@components/features/dataManagement/brands/client/ediBrandForm/editBrandForm';

import { Brand, BrandsPageSearchParams } from './page.types';

const getBrandData = async (id: string | undefined) => {
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
  const brandData = await getBrandData(params.id);
  return {
    title: brandData.name,
  };
};

const BrandPage = async ({ params }: BrandsPageSearchParams) => {
  const brandData = await getBrandData(params.id);
  return (
    <div className="flex w-full">
      <EditBrandForm brand={brandData} />
    </div>
  );
};

export default BrandPage;
