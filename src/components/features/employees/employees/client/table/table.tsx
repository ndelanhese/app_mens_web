'use client';

import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Table } from '@/components/shared/table/table';
import { api } from '@axios';

import {
  RefModalProps,
  TableActionCallbackOptions,
  TableColumn,
} from '@components/shared/table/table.types';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';

import { Employee, EmployeesTableProps } from './table.types';
import { ViewEmployeeForm } from '../../server/viewEmployeeForm/viewEmployeeForm';
import { parseCookies } from 'nookies';
import { Plus } from 'lucide-react';

const EmployeesTableComponent = ({ rows }: EmployeesTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createEmployeeModalRef = useRef<RefModalProps | null>(null);
  const editEmployeeModalRef = useRef<RefModalProps | null>(null);

  const [selectedEmployee, setSelectEmployee] = useState<Employee | undefined>(
    undefined,
  );

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

  const handleDeleteItem = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.refresh();
        toast({
          title: 'Funcionário deletado com sucesso',
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
    [router, toast, token],
  );

  const handleRowClick = useCallback(
    async (row: Employee, action: TableActionCallbackOptions) => {
      const { id } = row;

      setSelectEmployee(row);

      if (action === 'delete') {
        await handleDeleteItem(id);
      }
    },
    [handleDeleteItem],
  );

  const NEW_EMPLOYEE_TRIGGER = (
    <StyledDiv>
      Criar novo funcionário
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewEmployeeModal = useCallback(() => {
    createEmployeeModalRef.current?.close();
    setSelectEmployee(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditEmployeeModal = useCallback(() => {
    editEmployeeModalRef.current?.close();
    setSelectEmployee(undefined);
    router.refresh();
  }, [router]);

  return (
    <Table
      tableColumns={tableColumns}
      filter="Nome"
      rows={rows}
      actionLabel="Ação"
      actionCallback={handleRowClick}
      newItemTrigger={NEW_EMPLOYEE_TRIGGER}
      viewItemDialogTitle="Visualizar funcionário"
      viewItemDialogDescription="Visualizar um funcionário no sistema..."
      viewItemDialogContent={<ViewEmployeeForm employee={selectedEmployee} />}
      newItemDialogDescription="Criar um novo funcionário no sistema."
      newItemDialogTitle="Criar novo funcionário"
      newItemDialogRef={ref => {
        createEmployeeModalRef.current = ref;
      }}
      editItemDialogTitle="Editar funcionário"
      editItemDialogDescription="Editar um funcionário no sistema..."
      editItemDialogRef={ref => {
        editEmployeeModalRef.current = ref;
      }}
    />
  );
};

export const EmployeesTable = memo(EmployeesTableComponent);
