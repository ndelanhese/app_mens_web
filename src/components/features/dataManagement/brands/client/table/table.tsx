'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

import { api } from '@axios';
import { TableSkeleton } from '@/components/shared/skeleton/tableSkeleton/tableSkeleton';

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
import { ViewBrandForm } from '../../server/viewBrandForm/viewBrandForm';
import { CreateBrandForm } from '../createBrandForm/createBrandForm';
import { EditBrandForm } from '../ediBrandForm/editBrandForm';
import { Brand, BrandsTableProps } from './table.types';
import { parseCookies } from 'nookies';

export const BrandsTable = ({ rows }: BrandsTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createBranModalRef = useRef<RefModalProps | null>(null);
  const editBranModalRef = useRef<RefModalProps | null>(null);

  const [selectedBrand, setSelectBrand] = useState<Brand | undefined>(
    undefined,
  );

  const tableColumns: Array<TableColumn<Brand>> = useMemo(
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
        await api.delete(`/brands/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    [router, toast, token],
  );

  const handleRowClick = useCallback(
    async (row: Brand, action: TableActionCallbackOptions) => {
      const { id } = row;

      setSelectBrand(row);

      if (action === 'delete') {
        await handleDeleteItem(id);
      }
    },
    [handleDeleteItem],
  );

  const NEW_BRAND_TRIGGER = (
    <StyledDiv>
      Criar nova marca
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewBrandModal = useCallback(() => {
    createBranModalRef.current?.close();
    setSelectBrand(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditBrandModal = useCallback(() => {
    editBranModalRef.current?.close();
    setSelectBrand(undefined);
    router.refresh();
  }, [router]);

  const getBrandFunction = useCallback(() => {
    return selectedBrand;
  }, [selectedBrand]);

  if (rows.length < 1) {
    return <TableSkeleton />;
  }

  return (
    <Table
      tableColumns={tableColumns}
      rows={rows}
      actionCallback={handleRowClick}
      newItemDialogContent={
        <CreateBrandForm handleCloseModal={handleCloseNewBrandModal} />
      }
      newItemDialogDescription="Criar uma nova marca no sistema."
      newItemDialogTitle="Criar nova marca"
      newItemTrigger={NEW_BRAND_TRIGGER}
      newItemDialogRef={ref => {
        createBranModalRef.current = ref;
      }}
      editItemDialogTitle="Editar marca"
      editItemDialogDescription="Editar uma marca no sistema..."
      editItemDialogContent={
        <EditBrandForm
          getBrandFunction={getBrandFunction}
          handleCloseModal={handleCloseEditBrandModal}
        />
      }
      editItemDialogRef={ref => {
        editBranModalRef.current = ref;
      }}
      viewItemDialogTitle="Visualizar marca"
      viewItemDialogDescription="Visualizar uma marca no sistema..."
      viewItemDialogContent={<ViewBrandForm brand={selectedBrand} />}
    />
  );
};
