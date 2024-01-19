'use client';

import { RefModalProps } from '@components/shared/table/table.types';
import { TableDialog } from '@components/shared/table/tableDialog';
import { Button } from '@components/ui/shadcn/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/ui/shadcn/tabs';
import { Download } from 'lucide-react';
import { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { CalendarDateRangePicker } from './components/dateRangePicker';
import { ProductsWithLowStockTable } from './components/producsWithLowStockTable';
import { OverviewTab } from './components/tabs/overViewTab';
import { ReportsTab } from './components/tabs/reportsTab';
import { ProductsStockResponse } from './dashboard.types';

export const Dashboard = () => {
  const productsStockModalRef = useRef<RefModalProps | null>(null);

  const [productsWithLowStock, setProductsWithLowStock] = useState<
    ProductsStockResponse | undefined
  >(undefined);

  useEffect(() => {
    const { 'stock-notifications-mens-modas': stockNotifications } =
      parseCookies();
    const productsWithLowQty: ProductsStockResponse | undefined =
      stockNotifications ? JSON?.parse(stockNotifications) : undefined;

    if (productsWithLowQty && productsWithLowQty.data.length > 0) {
      setProductsWithLowStock(productsWithLowQty);
      destroyCookie(null, 'stock-notifications-mens-modas');
    }
  }, []);

  useEffect(() => {
    if (productsWithLowStock) {
      productsStockModalRef.current?.open();
    }
  }, [productsWithLowStock]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex w-full items-center justify-between sm:w-auto sm:space-x-2"></div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>
            <TabsContent value="reports">
              <ReportsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {productsWithLowStock && (
        <TableDialog
          dialogRef={ref => {
            productsStockModalRef.current = ref;
          }}
          content={
            <ProductsWithLowStockTable products={productsWithLowStock} />
          }
          description="Produtos com estoque menor ou igual a 3 unidades."
          title="Produtos com estoque baixo."
          isTriggered={false}
        />
      )}
    </>
  );
};
