import { OrdersTable } from '@components/features/customers/orders/client/table/table';
import { Metadata } from 'next';

import { getOrders } from './api';
import { Orders } from './page.types';

const iterateResponse = (orders: Orders | undefined) => {
  if (!orders) return [];

  return orders.data.map(order => {
    const productsList = order?.orders_products
      ?.map(product => product?.name)
      .join(', ');

    return {
      ...order,
      productsList: productsList
        ? productsList.length > 25
          ? productsList.substring(0, 25) + '...'
          : productsList
        : '',
    };
  });
};

export const metadata: Metadata = {
  title: 'Pedidos',
};

const Orders = async () => {
  const orders = await getOrders();
  const rows = iterateResponse(orders);
  return <OrdersTable rows={rows} />;
};

export default Orders;
