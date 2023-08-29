'use client'

import { memo, useMemo } from 'react'

import { Table } from '@/components/shared/table/table'
import { TableColumn } from '@/components/shared/table/table.types'

import { TableColumnHeader } from '@components/shared/table/tableColumnHeader'

import { Product, ProductsTableProps } from './table.types'

const ProductsTableComponent = ({ rows }: ProductsTableProps) => {
  const tableColumns: Array<TableColumn<Product>> = useMemo(
    () => [
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Nome" />
        ),
        accessorKey: 'name',
        id: 'Nome',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Código" />
        ),
        accessorKey: 'partNumber',
        id: 'Código',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Descrição" />
        ),
        accessorKey: 'description',
        id: 'Descrição',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Preço" />
        ),
        accessorKey: 'price',
        id: 'Preço',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Tamanho" />
        ),
        accessorKey: 'size',
        id: 'Tamanho',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Cor" />
        ),
        accessorKey: 'color',
        id: 'Cor',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Quantidade" />
        ),
        accessorKey: 'quantity',
        id: 'Quantidade',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Categoria" />
        ),
        accessorKey: 'category',
        id: 'Categoria',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Marca" />
        ),
        accessorKey: 'brand',
        id: 'Marca',
      },
    ],
    [],
  )

  const handleRowClick = (row: Product) => {
    console.log(row)
  }

  return (
    <Table
      tableColumns={tableColumns}
      filter="Nome"
      rows={rows}
      actionLabel="Ação"
      actionCallback={handleRowClick}
    />
  )
}

export const ProductsTable = memo(ProductsTableComponent)
