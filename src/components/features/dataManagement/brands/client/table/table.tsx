'use client';

import { memo, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@axios';

import { Table } from '@components/shared/table/table';
import {
  TableActionCallbackOptions,
  TableColumn,
} from '@components/shared/table/table.types';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { Brands, BrandsTableProps } from './table.types';

export const BrandsTable = ({ rows }: BrandsTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

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

  const handleDeleteItem = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/brands/${id}`);
        router.refresh();
        toast({
          title: 'Marca deletada com sucesso',
        });
      } catch (error: Error | any) {
        const message =
          error?.response?.data?.message ?? 'Erro ao deletar o item';
        toast({
          title: 'Erro ao deletar',
          description: message,
          variant: 'destructive',
        });
      }
    },
    [router, toast],
  );

  const handleRowClick = useCallback(
    async (row: Brands, action: TableActionCallbackOptions) => {
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
          await handleDeleteItem(id);
          break;
        default:
          router.push(`/data-management/brands/${slugName}/${id}`);
          break;
      }
    },
    [handleDeleteItem, router],
  );

  return (
    <Table
      tableColumns={tableColumns}
      filter="Nome"
      rows={rows}
      actionCallback={handleRowClick}
    />
  );
};
