'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@components/ui/shadcn/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/ui/shadcn/tabs';
import { TableDialog } from '@components/shared/table/tableDialog';
import { RefModalProps } from '@components/shared/table/table.types';

import { CalendarDateRangePicker } from './components/dateRangePicker';
import { OverviewTab } from './components/tabs/overViewTab';
import { Download } from 'lucide-react';
import { AnalyticsTab } from './components/tabs/analyticsTab';
import { ReportsTab } from './components/tabs/reportsTab';
import { NotificationsTab } from './components/tabs/notificationsTab';
import { parseCookies } from 'nookies';
import { ProductsStockResponse } from './dashboard.types';

export const Dashboard = () => {
  const productsStockModalRef = useRef<RefModalProps | null>(null);

  const [value, setValue] = useState<string>('overview');

  useEffect(() => {
    const { 'stock-notifications-mens-modas': stockNotifications } =
      parseCookies();
    const productsWithLowQty: ProductsStockResponse =
      JSON.parse(stockNotifications);

    if (productsWithLowQty && productsWithLowQty.data.length > 0) {
      productsStockModalRef.current?.open();
      console.log(productsWithLowQty);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex w-full items-center justify-between sm:w-auto sm:space-x-2">
              <CalendarDateRangePicker />
              {(value === 'analytics' || value === 'reports') && (
                <Button className="inline-flex gap-2">
                  <Download className="h-4 w-4" />
                  <p className="hidden sm:block">Baixar</p>
                </Button>
              )}
            </div>
          </div>
          <Tabs
            defaultValue="overview"
            value={value}
            onValueChange={setValue}
            className="space-y-4"
          >
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>
            <TabsContent value="analytics">
              <AnalyticsTab />
            </TabsContent>
            <TabsContent value="reports">
              <ReportsTab />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {
        <TableDialog
          dialogRef={ref => {
            productsStockModalRef.current = ref;
          }}
          content={<h1>teste</h1>}
          description="Produtos com estoque menor ou igual a 3 unidades."
          title="Produtos com estoque baixo."
          isTriggered={false}
        />
      }
    </div>
  );
};
