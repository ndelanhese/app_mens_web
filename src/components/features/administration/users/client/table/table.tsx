'use client'

import { memo, useCallback, useMemo } from 'react'

import { Table } from '@components/shared/table/table'
import { TableColumn } from '@components/shared/table/table.types'
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader'

import { User, UserTableProps } from './table.types'

const UserTableComponent = ({ rows }: UserTableProps) => {
  const tableColumns: Array<TableColumn<User>> = useMemo(
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
          <TableColumnHeader column={column} title="CPF" />
        ),
        accessorKey: 'cpf',
        id: 'CPF',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="E-mail" />
        ),
        accessorKey: 'email',
        id: 'E-mail',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Celular" />
        ),
        accessorKey: 'phone',
        id: 'Celular',
      },
    ],
    [],
  )

  const handleRowClick = useCallback((row: User) => {
    console.log(row)
  }, [])

  // const ACTION_BUTTON = ()

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

export const UserTable = memo(UserTableComponent)
