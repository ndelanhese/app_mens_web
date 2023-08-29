'use client'

import { memo, useMemo } from 'react'

import { Table } from '@/components/shared/table/table'
import { TableColumn } from '@/components/shared/table/table.types'

import { TableColumnHeader } from '@components/shared/table/tableColumnHeader'

import { Supplier, SuppliersTableProps } from './table.types'

const SuppliersTableComponent = ({ rows }: SuppliersTableProps) => {
  const tableColumns: Array<TableColumn<Supplier>> = useMemo(
    () => [
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Nome" />
        ),
        accessorKey: 'contactName',
        id: 'Nome',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Empresa" />
        ),
        accessorKey: 'corporateName',
        id: 'Empresa',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="CNPJ" />
        ),
        accessorKey: 'cnpj',
        id: 'CNPJ',
      },
    ],
    [],
  )

  const handleRowClick = (row: Supplier) => {
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

export const SuppliersTable = memo(SuppliersTableComponent)
