'use client';

import { usePathname } from 'next/navigation';
import { memo } from 'react';

import { BreadcrumbMapping } from './breadcrumb.types';

const breadcrumbMapping: BreadcrumbMapping = {
  '/dashboard': 'Dashboard',
  '/administration/users': 'Usuários',
  '/administration/roles-permissions': 'Papéis e permissões',
  '/data-management/brands': 'Marcas',
  '/data-management/categories': 'Categorias',
  '/data-management/products': 'Produtos',
  '/customers/customers': 'Clientes',
  '/customers/orders': 'Pedidos',
  '/customers/sales': 'Vendas',
  '/employees/employees': 'Funcionários',
  '/employees/suppliers': 'Fornecedores',
  '/promotions/promotion-categories': 'Categorias de Promoção',
  '/promotions/promotions': 'Promoções',
};

const getDefaultBreadcrumb = (): string => 'Página Desconhecida';

const getBreadcrumbText = (pathname: string): string =>
  breadcrumbMapping[pathname] || getDefaultBreadcrumb();

const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const breadcrumbText = getBreadcrumbText(pathname);

  return (
    <div className="invisible w-12 sm:visible sm:w-auto">{breadcrumbText}</div>
  );
};

export const Breadcrumb = memo(BreadcrumbComponent);
