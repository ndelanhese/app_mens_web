import { CustomersTable } from '@features-components/customers/customers/client/table/table';
import { Metadata } from 'next';

import { getCustomers } from './api';
import { Customers } from './page.types';

const iterateResponse = (customers?: Customers) => {
  if (!customers) return [];
  return customers?.data?.map(customer => customer);
};

export const metadata: Metadata = {
  title: 'Clientes',
};

const Customers = async () => {
  const customers = await getCustomers();
  const rows = iterateResponse(customers);
  return <CustomersTable rows={rows} />;
};

export default Customers;
