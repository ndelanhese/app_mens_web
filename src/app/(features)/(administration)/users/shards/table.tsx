'use client'

import { useMemo } from 'react'

import { Table } from '@/components/shared/table/table'
import { TableColumn } from '@/components/shared/table/table.types'

import { TableColumnHeader } from '@components/shared/table/tableColumnHeader'

import { Representative, UserTableProps } from './table.types'

export const UserTable = ({ rows }: UserTableProps) => {
  const tableColumns: Array<TableColumn<Representative>> = useMemo(
    () => [
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Representante" />
        ),
        accessorKey: 'representative',
        id: 'Representante',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="CPF/CNPJ" />
        ),
        accessorKey: 'cpfCnpj',
        id: 'CPF/CNPJ',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Registro" />
        ),
        accessorKey: 'registration',
        id: 'Registro',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Equipe" />
        ),
        accessorKey: 'teamCode',
        id: 'Equipe',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Filial" />
        ),
        accessorKey: 'branchCode',
        id: 'Filial',
      },
    ],
    [],
  )

  const handleRowClick = (row: Representative) => {
    console.log(row)
  }

  return (
    <Table
      tableColumns={tableColumns}
      filter="Representante"
      rows={rows}
      actionLabel="Ação"
      actionCallback={handleRowClick}
    />
  )
}
