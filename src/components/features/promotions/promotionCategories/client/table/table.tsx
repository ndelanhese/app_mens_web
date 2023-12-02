'use client';

import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { api } from '@axios';

import { Table } from '@components/shared/table/table';
import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';
import {
  RefModalProps,
  TableActionCallbackOptions,
  TableColumn,
} from '@components/shared/table/table.types';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';

import { Plus } from 'lucide-react';
import { parseCookies } from 'nookies';
import { CategoriesTableProps, Category } from './table.types';
import { CreateCategoryForm } from '../createPromotionCategoryForm/createCategoryForm';
import { EditCategoryForm } from '../editPromotionCategoryForm/editCategoryForm';
import { ViewCategoryForm } from '../../server/viewPromotionCategoryForm/viewCategoryForm';

const CategoriesTableComponents = ({ rows }: CategoriesTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createCategoryModalRef = useRef<RefModalProps | null>(null);
  const editCategoryModalRef = useRef<RefModalProps | null>(null);

  const [selectedCategory, setSelectCategory] = useState<Category | undefined>(
    undefined,
  );

  const tableColumns: Array<TableColumn<Category>> = useMemo(
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
        await api.delete(`/promotions-categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.refresh();
        toast({
          title: 'Categoria deletada com sucesso',
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
    async (row: Category, action: TableActionCallbackOptions) => {
      const { id } = row;

      setSelectCategory(row);

      if (action === 'delete') {
        await handleDeleteItem(id);
      }
    },
    [handleDeleteItem],
  );

  const NEW_CATEGORY_TRIGGER = (
    <StyledDiv>
      Criar nova categoria
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewCategoryModal = useCallback(() => {
    createCategoryModalRef.current?.close();
    setSelectCategory(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditCategoryModal = useCallback(() => {
    editCategoryModalRef.current?.close();
    setSelectCategory(undefined);
    router.refresh();
  }, [router]);

  if (!rows) {
    return <TableSkeleton />;
  }

  return (
    <Table
      tableColumns={tableColumns}
      rows={rows}
      actionCallback={handleRowClick}
      newItemDialogContent={
        <CreateCategoryForm handleCloseModal={handleCloseNewCategoryModal} />
      }
      newItemDialogDescription="Criar uma nova categoria no sistema."
      newItemDialogTitle="Criar nova categoria"
      newItemTrigger={NEW_CATEGORY_TRIGGER}
      newItemDialogRef={ref => {
        createCategoryModalRef.current = ref;
      }}
      editItemDialogTitle="Editar categoria"
      editItemDialogDescription="Editar uma categoria no sistema..."
      editItemDialogContent={
        <EditCategoryForm
          category={selectedCategory}
          handleCloseModal={handleCloseEditCategoryModal}
        />
      }
      editItemDialogRef={ref => {
        editCategoryModalRef.current = ref;
      }}
      viewItemDialogTitle="Visualizar categoria"
      viewItemDialogDescription="Visualizar uma categoria no sistema..."
      viewItemDialogContent={<ViewCategoryForm category={selectedCategory} />}
    />
  );
};

export const CategoriesTable = memo(CategoriesTableComponents);
