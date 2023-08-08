'use client'

import { usePathname } from 'next/navigation'

import { BreadcrumbMapping } from './breadcrumb.types'

const breadcrumbMapping: BreadcrumbMapping = {
  '/': 'Tela Inicial',
  '/administration/users': 'Administração / Usuários',
  '/administration/roles-permissions': 'Administração / Permissões',
  '/data-management/brands': 'Gerenciamento de Dados / Marcas',
  '/data-management/categories': 'Gerenciamento de Dados / Categorias',
  '/data-management/products': 'Gerenciamento de Dados / Produtos',
  '/customers/orders': 'Clientes / Pedidos',
  '/customers/sales': 'Clientes / Vendas',
  '/employees/employees': 'Funcionários / Funcionários',
  '/employees/suppliers': 'Funcionários / Fornecedores',
  '/financial/summaries': 'Financeiro / Resumos',
  '/promotions/promotion-categories': 'Promoções / Categorias de Promoção',
  '/promotions/promotions': 'Promoções / Promoções',
}

const getDefaultBreadcrumb = (): string => 'Página Desconhecida'

const getBreadcrumbText = (pathname: string): string =>
  breadcrumbMapping[pathname] || getDefaultBreadcrumb()

export const Breadcrumb = () => {
  const pathname = usePathname()
  const breadcrumbText = getBreadcrumbText(pathname)

  return (
    <div className="invisible w-12 sm:visible sm:w-auto">{breadcrumbText}</div>
  )
}
