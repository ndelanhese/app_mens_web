'use client';

import { memo, useCallback, useMemo } from 'react';

import { Table } from '@/components/shared/table/table';
import { TableColumn } from '@/components/shared/table/table.types';

import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';

import { Promotion, PromotionsTableProps } from './table.types';

const PromotionsTableComponent = ({ rows }: PromotionsTableProps) => {
  const tableColumns: Array<TableColumn<Promotion>> = useMemo(
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
          <TableColumnHeader column={column} title="Descrição" />
        ),
        accessorKey: 'description',
        id: 'Descrição',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Desconto" />
        ),
        accessorKey: 'discount',
        id: 'Desconto',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Data inicial" />
        ),
        accessorKey: 'initialDate',
        id: 'Data inicial',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Data final" />
        ),
        accessorKey: 'finalDate',
        id: 'Data final',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Status" />
        ),
        accessorKey: 'status',
        id: 'Status',
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
          <TableColumnHeader column={column} title="Produtos" />
        ),
        accessorKey: 'products',
        id: 'Produtos',
      },
    ],
    [],
  );

  const handleRowClick = useCallback((row: Promotion) => {
    console.log(row);
  }, []);

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

export const PromotionsTable = memo(PromotionsTableComponent);
