'use client';

import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@axios';

import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';
import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';
import { Table } from '@components/shared/table/table';
import {
  RefModalProps,
  TableActionCallbackOptions,
  TableColumn,
} from '@components/shared/table/table.types';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';

import { Promotion, PromotionsTableProps } from './table.types';
import { parseCookies } from 'nookies';
import { Plus } from 'lucide-react';
import { ViewPromotionForm } from '../viewPromotionForm/viewPromotionForm';
import { CreatePromotionForm } from '../createPromotionForm/createPromotionForm';
import { EditPromotionForm } from '../editPromotionForm/editPromotionForm';

const PromotionsTableComponent = ({ rows }: PromotionsTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createPromotionModalRef = useRef<RefModalProps | null>(null);
  const editPromotionModalRef = useRef<RefModalProps | null>(null);

  const [selectedPromotion, setSelectPromotion] = useState<
    Promotion | undefined
  >(undefined);

  const tableColumns: Array<TableColumn<Promotion>> = useMemo(
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
          <TableColumnHeader column={column} title="Produtos" />
        ),
        accessorKey: 'productsList',
        id: 'Produtos',
      },
    ],
    [],
  );

  const handleDeleteItem = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/promotions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.refresh();
        toast({
          title: 'Promoção deletada com sucesso',
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
    async (row: Promotion, action: TableActionCallbackOptions) => {
      const { id } = row;

      setSelectPromotion(row);

      if (action === 'delete') {
        await handleDeleteItem(id);
      }
    },
    [handleDeleteItem],
  );

  const NEW_PROMOTION_TRIGGER = (
    <StyledDiv>
      Criar nova promoção
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewPromotionModal = useCallback(() => {
    createPromotionModalRef.current?.close();
    setSelectPromotion(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditPromotionModal = useCallback(() => {
    editPromotionModalRef.current?.close();
    setSelectPromotion(undefined);
    router.refresh();
  }, [router]);

  return (
    <Table
      tableColumns={tableColumns}
      rows={rows}
      actionCallback={handleRowClick}
      newItemDialogContent={
        <CreatePromotionForm handleCloseModal={handleCloseNewPromotionModal} />
      }
      newItemDialogDescription="Criar uma nova promoção no sistema."
      newItemDialogTitle="Criar nova promoção"
      newItemTrigger={NEW_PROMOTION_TRIGGER}
      newItemDialogRef={ref => {
        createPromotionModalRef.current = ref;
      }}
      editItemDialogTitle="Editar promoção"
      editItemDialogDescription="Editar uma promoção no sistema..."
      editItemDialogContent={
        <EditPromotionForm
          promotion={selectedPromotion}
          handleCloseModal={handleCloseEditPromotionModal}
        />
      }
      editItemDialogRef={ref => {
        editPromotionModalRef.current = ref;
      }}
      viewItemDialogTitle="Visualizar promoção"
      viewItemDialogDescription="Visualizar uma promoção no sistema..."
      viewItemDialogContent={
        <ViewPromotionForm promotion={selectedPromotion} />
      }
      deleteItemTitle="Excluir Promoção"
      deleteItemDescription="Você tem certeza que deseja excluir esta promoção?"
    />
  );
};

export const PromotionsTable = memo(PromotionsTableComponent);
