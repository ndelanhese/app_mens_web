'use client';

import { useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@axios';

import { Table } from '@components/shared/table/table';
import {
  RefModalProps,
  TableActionCallbackOptions,
  TableColumn,
} from '@components/shared/table/table.types';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { Brands, BrandsTableProps } from './table.types';
import { Plus } from 'lucide-react';
import { CreateBrandForm } from '../createBrandForm/createBrandForm';

export const BrandsTable = ({ rows }: BrandsTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const createBranModalRef = useRef<RefModalProps | null>(null);

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

  const NEW_BRAND_TRIGGER = (
    <StyledDiv>
      Criar nova marca
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewBrandModal = useCallback(() => {
    createBranModalRef.current?.close();
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
    />
  );
};
