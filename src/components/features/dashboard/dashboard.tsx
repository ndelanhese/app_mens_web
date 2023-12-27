import { Button } from '@components/ui/shadcn/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/ui/shadcn/tabs';

import { CalendarDateRangePicker } from './components/dateRangePicker';
import { OverviewTab } from './components/tabs/overViewTab';
import { Download } from 'lucide-react';
import { AnalyticsTab } from './components/tabs/analyticsTab';
import { ReportsTab } from './components/tabs/reportsTab';
import { NotificationsTab } from './components/tabs/notificationsTab';

export const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex w-full items-center justify-between sm:w-auto sm:space-x-2">
              <CalendarDateRangePicker />
              <Button className="inline-flex gap-2">
                <Download className="h-4 w-4" />
                <p className="hidden sm:block">Baixar</p>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
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
    </div>
  );
};
