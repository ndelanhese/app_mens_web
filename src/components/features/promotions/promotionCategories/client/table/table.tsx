'use client'

import { memo, useCallback, useMemo } from 'react'

import { Table } from '@/components/shared/table/table'
import { TableColumn } from '@/components/shared/table/table.types'

import { TableColumnHeader } from '@components/shared/table/tableColumnHeader'

import { Category, CategoriesTableProps } from './table.types'

const CategoriesTableComponent = ({ rows }: CategoriesTableProps) => {
  const tableColumns: Array<TableColumn<Category>> = useMemo(
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

  const handleRowClick = useCallback((row: Category) => {
    console.log(row)
  }, [])

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

export const CategoriesTable = memo(CategoriesTableComponent)
