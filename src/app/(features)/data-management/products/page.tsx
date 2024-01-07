import { cookies } from 'next/headers';
import { cache } from 'react';
import { Metadata } from 'next';

import { api } from '@axios';
import { ProductsTable } from '@features-components/dataManagement/products/client/table/table';

import { Products } from './page.types';

const iterateResponse = (products?: Products) => {
  if (!products) return [];
  return products?.data?.map(product => ({
    id: product?.id,
    name: product?.name,
    partNumber: product?.part_number,
    description: product?.description,
    price: product?.price,
    price_formatted: product.price_formatted,
    size: product?.size,
    color: product?.color,
    quantity: product?.quantity,
    category: product?.category,
    brand: product?.brand,
    supplier: product.supplier,
  }));
};

const getProducts = cache(async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Products>('/products', {
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
  title: 'Produtos',
};

const Products = async () => {
  const categories = await getProducts();
  const rows = iterateResponse(categories);
  return <ProductsTable rows={rows} />;
};

export default Products;
