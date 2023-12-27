import { Metadata } from 'next';

import { SalesTable } from '@components/features/customers/sales/client/table/table';

import { getSales } from './api';
import { Sales } from './page.types';

const iterateResponse = (sales: Sales | undefined) => {
  if (!sales) return [];

  return sales.data.map(sale => {
    const productsList = sale?.products
      ?.map(product => product?.name)
      .join(', ');

    const methodsOfPayments = sale.methods_of_payments.map(method => ({
      id: method.id,
      installment: method.installment,
      name: method.method.name,
      method_id: method.method.id,
    }));

    const methodsList = methodsOfPayments
      ?.map(method => method?.name)
      .join(', ');

    return {
      ...sale,
      methods_of_payments: methodsOfPayments,
      methodsList,
      productsList: productsList
        ? productsList.length > 25
          ? productsList.substring(0, 25) + '...'
          : productsList
        : '',
    };
  });
};

export const metadata: Metadata = {
  title: 'Vendas',
};

const Sales = async () => {
  const sales = await getSales();
  const rows = iterateResponse(sales);
  return <SalesTable rows={rows} />;
};

export default Sales;
