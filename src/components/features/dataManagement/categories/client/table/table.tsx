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

import { Category, CategoriesTableProps } from './table.types';
import { Plus } from 'lucide-react';
import { ViewCategoryForm } from '../../server/viewCategoryForm/viewCategoryForm';
import { EditCategoryForm } from '../ediCategoryForm/editCategoryForm';
import { CreateCategoryForm } from '../createCategoryForm/createCategoryForm';

const CategoriesTableComponents = ({ rows }: CategoriesTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

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
        await api.delete(`/categories/${id}`);
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
    [router, toast],
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

  const getCategoryFunction = useCallback(() => {
    return selectedCategory;
  }, [selectedCategory]);

  if (rows.length < 1) {
    return <TableSkeleton />;
  }
  return (
    <Table
      tableColumns={tableColumns}
      filter="Nome"
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
          getCategoryFunction={getCategoryFunction}
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
