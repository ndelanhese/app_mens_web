'use client';

import { memo, useCallback, useMemo } from 'react';

import { Table } from '@/components/shared/table/table';
import { TableColumn } from '@/components/shared/table/table.types';

import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';

import { Employee, EmployeesTableProps } from './table.types';

const EmployeesTableComponent = ({ rows }: EmployeesTableProps) => {
  const tableColumns: Array<TableColumn<Employee>> = useMemo(
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
          <TableColumnHeader column={column} title="Celular" />
        ),
        accessorKey: 'phone',
        id: 'Celular',
      },
    ],
    [],
  );

  const handleRowClick = useCallback((row: Employee) => {
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

export const EmployeesTable = memo(EmployeesTableComponent);
