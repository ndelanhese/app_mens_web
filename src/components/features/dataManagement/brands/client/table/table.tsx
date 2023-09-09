'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

import { api } from '@axios';

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

export const BrandsTable = ({ rows }: BrandsTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const createBranModalRef = useRef<RefModalProps | null>(null);
  const editBranModalRef = useRef<RefModalProps | null>(null);
  const viewBranModalRef = useRef<RefModalProps | null>(null);

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
    async (row: Brand, action: TableActionCallbackOptions) => {
      const { id } = row;

      switch (action) {
        case 'view':
          setSelectBrand(row);
          break;
        case 'edit':
          setSelectBrand(row);
          break;
        case 'delete':
          await handleDeleteItem(id);
          break;
        default:
          setSelectBrand(row);
          break;
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
  }, []);

  const handleCloseEditBrandModal = useCallback(() => {
    editBranModalRef.current?.close();
  }, []);

  const handleCloseViewBrandModal = useCallback(() => {
    viewBranModalRef.current?.close();
  }, []);

  return (
    <Table
      tableColumns={tableColumns}
      filter="Nome"
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
      editItemDialogContent={<EditBrandForm brand={selectedBrand} />}
      editItemDialogRef={ref => {
        editBranModalRef.current = ref;
      }}
      viewItemDialogTitle="Visualizar marca"
      viewItemDialogDescription="Visualizar uma marca no sistema..."
      viewItemDialogContent={<ViewBrandForm brand={selectedBrand} />}
      viewItemDialogRef={ref => {
        viewBranModalRef.current = ref;
      }}
    />
  );
};
