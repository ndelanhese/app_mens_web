import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/ui/shadcn/tabs';

import { CalendarDateRangePicker } from '../dateRangePicker';

export const ReportsTab = () => (
  <div>
    <div className="flex w-full flex-1">
      <Tabs defaultValue="products" className="w-full space-y-4">
        <div className="flex w-full flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="methods_of_payments">Mét. de pag.</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="brands">Marcas</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <CalendarDateRangePicker />
          </div>
        </div>
        <TabsContent value="products">
          <h1>Products tab</h1>
        </TabsContent>
        <TabsContent value="methods_of_payments">
          <h1>Methods of Payments tab</h1>
        </TabsContent>
        <TabsContent value="categories">
          <h1>Categories tab</h1>
        </TabsContent>
        <TabsContent value="brands">
          <h1>Brands tab</h1>
        </TabsContent>
      </Tabs>
    </div>
  </div>
);
