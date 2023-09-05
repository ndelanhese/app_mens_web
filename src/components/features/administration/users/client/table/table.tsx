'use client';

import { memo, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { convertStringToSlug } from '@/utils/helpers/stringManipulation';

import { Table } from '@components/shared/table/table';
import {
  TableActionCallbackOptions,
  TableColumn,
} from '@components/shared/table/table.types';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';

import { User, UserTableProps } from './table.types';

const UserTableComponent = ({ rows }: UserTableProps) => {
  const router = useRouter();

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
  );

  const handleRowClick = useCallback(
    (row: User, action: TableActionCallbackOptions) => {
      const { name, id } = row;
      const slugName = convertStringToSlug(name);

      switch (action) {
        case 'view':
          router.push(`/administration/users/${slugName}/${id}`);
          break;
        case 'edit':
          router.push(`/administration/users/${slugName}/${id}/edit`);
          break;
        case 'delete':
          console.log('delete');
          break;
        default:
          router.push(`/administration/users/${slugName}/${id}`);
          break;
      }
    },
    [],
  );

  // const ACTION_BUTTON = ()

  return (
    <Table
      tableColumns={tableColumns}
      filter="Nome"
      rows={rows}
      actionLabel="Ação"
      actionCallback={handleRowClick}
    />
  );
};

export const UserTable = memo(UserTableComponent);
