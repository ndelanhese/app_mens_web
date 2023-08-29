'use client'

import { memo, useMemo } from 'react'

import { Table } from '@/components/shared/table/table'
import { TableColumn } from '@/components/shared/table/table.types'

import { TableColumnHeader } from '@components/shared/table/tableColumnHeader'

import { Brands, BrandsTableProps } from './table.types'

export const BrandsTableComponent = ({ rows }: BrandsTableProps) => {
  const tableColumns: Array<TableColumn<Brands>> = useMemo(
    () => [
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Nome" />
        ),
        accessorKey: 'name',
        id: 'Nome',
      },
    ],
    [],
  )

  const handleRowClick = (row: Brands) => {
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

export const BrandsTable = memo(BrandsTableComponent)