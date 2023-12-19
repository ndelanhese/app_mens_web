import { Metadata } from 'next';

import { getOrders } from './api';
import { Orders } from './page.types';

const iterateResponse = (orders: Orders | undefined) => {
  if (!orders) return [];

  return orders.data.map(order => ({
    ...order,
    productsList: order?.order_products
      ?.map(product => product?.name)
      .join(', ')
      ? order?.order_products?.map(product => product?.name).join(', ').length >
        25
        ? order?.order_products
            ?.map(product => product?.name)
            .join(', ')
            .substring(0, 25) + '...'
        : order?.order_products?.map(product => product?.name).join(', ')
      : '',
  }));
};

export const metadata: Metadata = {
  title: 'Pedidos',
};

const Orders = async () => {
  const orders = await getOrders();
  const rows = iterateResponse(orders);
  console.log(rows);
  // TODO -> add table here
};

export default Orders;
