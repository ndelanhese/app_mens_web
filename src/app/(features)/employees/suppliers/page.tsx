import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { api } from '@axios';

import { SuppliersTable } from '@components/features/employees/suppliers/client/table/table';

import { Suppliers } from './page.types';

const iterateResponse = (suppliers?: Suppliers) => {
  if (!suppliers) return [];
  return suppliers?.data?.map(supplier => ({
    id: supplier.id,
    contactName: supplier?.contact_name,
    corporateName: supplier?.corporate_name,
    cnpj: supplier?.cnpj,
    status: supplier?.status,
    addresses: supplier?.addresses?.map(address => ({
      id: address.id,
      address: address.address,
      number: address.number,
      district: address.district,
      postalCode: address.postal_code,
      city: address.city,
      state: address.state,
    })),
  }));
};

const getSuppliers = cache(async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Suppliers>('/suppliers', {
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
  title: 'Fornecedores',
};

const Suppliers = async () => {
  const suppliers = await getSuppliers();
  const rows = iterateResponse(suppliers);
  return <SuppliersTable rows={rows} />;
};

export default Suppliers;
