'use client';

import { memo, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Table } from '@/components/shared/table/table';
import {
  TableActionCallbackOptions,
  TableColumn,
} from '@/components/shared/table/table.types';

import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { Brands, BrandsTableProps } from './table.types';

const BrandsTableComponent = ({ rows }: BrandsTableProps) => {
  const router = useRouter();

  const tableColumns: Array<TableColumn<Brands>> = useMemo(
    () => [
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Código" />
        ),
        accessorKey: 'id',
        id: 'Código',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Nome" />
        ),
        accessorKey: 'name',
        id: 'Nome',
      },
    ],
    [],
  );

  const handleRowClick = useCallback(
    (row: Brands, action: TableActionCallbackOptions) => {
      const { name, id } = row;
      const slugName = convertStringToSlug(name);

      switch (action) {
        case 'view':
          router.push(`/data-management/brands/${slugName}/${id}`);
          break;
        case 'edit':
          router.push(`/data-management/brands/${slugName}/${id}/edit`);
          break;
        case 'delete':
          console.log('delete');
          break;
        default:
          router.push(`/data-management/brands/${slugName}/${id}`);
          break;
      }
    },
    [router],
  );

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

export const BrandsTable = memo(BrandsTableComponent);
