'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/ui/shadcn/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { BrandsTab } from './components/tabs/brandsTab';
import { CategoriesTab } from './components/tabs/categoriesTab';
import { MethodsOfPaymentsTab } from './components/tabs/methodsOfPayments';
import { ProductsTab } from './components/tabs/productsTab';

export const ReportsTab = () => {
  const { get: getSearchParam, entries } = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tab = getSearchParam('sub_tab') ?? 'products';

  const handleChangeTab = (tab: string) => {
    const current = new URLSearchParams(Array.from(entries()));

    current.set('sub_tab', tab);
    current.set('page', '1');
    current.set('per_page', '8');

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <div>
      <div className="flex w-full flex-1">
        <Tabs
          value={tab}
          onValueChange={handleChangeTab}
          className="w-full space-y-4"
        >
          <div className="flex w-full flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="products">Produtos</TabsTrigger>
              <TabsTrigger value="methods_of_payments">
                Mét. de pag.
              </TabsTrigger>
              <TabsTrigger value="categories">Categorias</TabsTrigger>
              <TabsTrigger value="brands">Marcas</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>
          <TabsContent value="methods_of_payments">
            <MethodsOfPaymentsTab />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>
          <TabsContent value="brands">
            <BrandsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
