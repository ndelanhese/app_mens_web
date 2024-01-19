'use client';

import { api } from '@axios';
import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';
import { Table } from '@components/shared/table/table';
import {
  RefModalProps,
  TableActionCallbackOptions,
  TableColumn,
} from '@components/shared/table/table.types';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { CreateCustomerForm } from '../createCustomerForm/createCustomerForm';
import { EditCustomerForm } from '../ediCustomerForm/editCustomerForm';
import { ViewCustomerForm } from '../viewCustomerForm/viewCustomerForm';
import { Customer, CustomersTableProps } from './table.types';

const CustomersTableComponent = ({ rows }: CustomersTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createCustomerModalRef = useRef<RefModalProps | null>(null);
  const editCustomerModalRef = useRef<RefModalProps | null>(null);

  const [selectedCustomer, setSelectCustomer] = useState<Customer | undefined>(
    undefined,
  );

  const tableColumns: Array<TableColumn<Customer>> = useMemo(
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
        await api.delete(`/customers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.refresh();
        toast({
          title: 'Cliente deletado com sucesso',
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
    async (row: Customer, action: TableActionCallbackOptions) => {
      const { id } = row;

      setSelectCustomer(row);

      if (action === 'delete') {
        await handleDeleteItem(id);
      }
    },
    [handleDeleteItem],
  );

  const NEW_CUSTOMER_TRIGGER = (
    <StyledDiv>
      Criar novo cliente
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewCustomerModal = useCallback(() => {
    createCustomerModalRef.current?.close();
    setSelectCustomer(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditCustomerModal = useCallback(() => {
    editCustomerModalRef.current?.close();
    setSelectCustomer(undefined);
    router.refresh();
  }, [router]);

  return (
    <Table
      tableColumns={tableColumns}
      rows={rows}
      actionCallback={handleRowClick}
      newItemDialogContent={
        <CreateCustomerForm handleCloseModal={handleCloseNewCustomerModal} />
      }
      newItemTrigger={NEW_CUSTOMER_TRIGGER}
      viewItemDialogTitle="Visualizar cliente"
      viewItemDialogDescription="Visualizar um cliente no sistema..."
      viewItemDialogContent={<ViewCustomerForm customer={selectedCustomer} />}
      newItemDialogDescription="Criar um novo cliente no sistema."
      newItemDialogTitle="Criar novo cliente"
      newItemDialogRef={ref => {
        createCustomerModalRef.current = ref;
      }}
      editItemDialogTitle="Editar cliente"
      editItemDialogDescription="Editar um cliente no sistema..."
      editItemDialogRef={ref => {
        editCustomerModalRef.current = ref;
      }}
      editItemDialogContent={
        <EditCustomerForm
          handleCloseModal={handleCloseEditCustomerModal}
          customer={selectedCustomer}
        />
      }
      deleteItemTitle="Excluir cliente"
      deleteItemDescription="Deseja realmente excluir o cliente?"
    />
  );
};

export const CustomersTable = memo(CustomersTableComponent);
