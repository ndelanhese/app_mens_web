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
import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';

import { Supplier, SuppliersTableProps } from './table.types';
import { parseCookies } from 'nookies';
import { Plus } from 'lucide-react';
import { ViewSupplierForm } from '../../server/viewSupplierForm/viewSupplierForm';
import { CreateSupplierForm } from '../createSupplierForm/createSupplierForm';
import { EditSupplierForm } from '../editSupplierForm/editSupplierForm';

const SuppliersTableComponent = ({ rows }: SuppliersTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createSupplierModalRef = useRef<RefModalProps | null>(null);
  const editSupplierModalRef = useRef<RefModalProps | null>(null);

  const [selectedSupplier, setSelectSupplier] = useState<Supplier | undefined>(
    undefined,
  );

  const tableColumns: Array<TableColumn<Supplier>> = useMemo(
    () => [
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Nome" />
        ),
        accessorKey: 'contactName',
        id: 'Nome',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Empresa" />
        ),
        accessorKey: 'corporateName',
        id: 'Empresa',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="CNPJ" />
        ),
        accessorKey: 'cnpj',
        id: 'CNPJ',
      },
    ],
    [],
  );

  const handleDeleteItem = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/suppliers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.refresh();
        toast({
          title: 'Fornecedor deletado com sucesso',
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
    async (row: Supplier, action: TableActionCallbackOptions) => {
      const { id } = row;

      setSelectSupplier(row);

      if (action === 'delete') {
        await handleDeleteItem(id);
      }
    },
    [handleDeleteItem],
  );

  const NEW_SUPPLIER_TRIGGER = (
    <StyledDiv>
      Criar novo fornecedor
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewSupplierModal = useCallback(() => {
    createSupplierModalRef.current?.close();
    setSelectSupplier(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditSupplierModal = useCallback(() => {
    editSupplierModalRef.current?.close();
    setSelectSupplier(undefined);
    router.refresh();
  }, [router]);

  if (!rows || rows.length < 1) {
    return <TableSkeleton />;
  }

  return (
    <Table
      tableColumns={tableColumns}
      rows={rows}
      actionLabel="Ação"
      actionCallback={handleRowClick}
      newItemDialogContent={
        <CreateSupplierForm handleCloseModal={handleCloseNewSupplierModal} />
      }
      newItemTrigger={NEW_SUPPLIER_TRIGGER}
      viewItemDialogTitle="Visualizar fornecedor"
      viewItemDialogDescription="Visualizar um fornecedor no sistema..."
      viewItemDialogContent={<ViewSupplierForm supplier={selectedSupplier} />}
      newItemDialogDescription="Criar um novo fornecedor no sistema."
      newItemDialogTitle="Criar novo fornecedor"
      newItemDialogRef={ref => {
        createSupplierModalRef.current = ref;
      }}
      editItemDialogTitle="Editar fornecedor"
      editItemDialogDescription="Editar um fornecedor no sistema..."
      editItemDialogRef={ref => {
        editSupplierModalRef.current = ref;
      }}
      editItemDialogContent={
        <EditSupplierForm
          handleCloseModal={handleCloseEditSupplierModal}
          supplier={selectedSupplier}
        />
      }
      deleteItemTitle="Excluir fornecedor"
      deleteItemDescription="Deseja realmente excluir o fornecedor?"
    />
  );
};

export const SuppliersTable = memo(SuppliersTableComponent);
