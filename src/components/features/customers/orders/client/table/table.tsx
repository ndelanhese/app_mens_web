'use client';

import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';
import { Table } from '@components/shared/table/table';
import {
  RefModalProps,
  TableColumn,
} from '@components/shared/table/table.types';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';

import { Plus } from 'lucide-react';
import { OrdersTableProps, Order } from './table.types';
import { CreateOrderForm } from '../createOrderForm/createOrderForm';
import { EditOrderForm } from '../editOrderForm/editOrderForm';
import { ViewOrderForm } from '../viewOrderForm/viewOrderForm';

const OrdersTableComponent = ({ rows }: OrdersTableProps) => {
  const router = useRouter();

  const createOrderModalRef = useRef<RefModalProps | null>(null);
  const editOrderModalRef = useRef<RefModalProps | null>(null);

  const [selectedOrder, setSelectOrder] = useState<Order | undefined>(
    undefined,
  );

  const tableColumns: Array<TableColumn<Order>> = useMemo(
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
          <TableColumnHeader column={column} title="Descrição" />
        ),
        accessorKey: 'description',
        id: 'Descrição',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Observação" />
        ),
        accessorKey: 'observation',
        id: 'Observação',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Data" />
        ),
        accessorKey: 'date',
        id: 'Data',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Cliente" />
        ),
        accessorKey: 'customer.name',
        id: 'Cliente',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Funcionário" />
        ),
        accessorKey: 'employee.name',
        id: 'Funcionário',
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

  const handleRowClick = useCallback(async (row: Order) => {
    setSelectOrder(row);
  }, []);

  const NEW_ORDER_TRIGGER = (
    <StyledDiv>
      Criar novo pedido
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewOrderModal = useCallback(() => {
    createOrderModalRef.current?.close();
    setSelectOrder(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditOrderModal = useCallback(() => {
    editOrderModalRef.current?.close();
    setSelectOrder(undefined);
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
        <CreateOrderForm handleCloseModal={handleCloseNewOrderModal} />
      }
      newItemDialogDescription="Criar um novo pedido no sistema."
      newItemDialogTitle="Criar novo pedido"
      newItemTrigger={NEW_ORDER_TRIGGER}
      newItemDialogRef={ref => {
        createOrderModalRef.current = ref;
      }}
      editItemDialogTitle="Editar pedido"
      editItemDialogDescription="Editar um pedido no sistema..."
      editItemDialogContent={
        <EditOrderForm
          order={selectedOrder}
          handleCloseModal={handleCloseEditOrderModal}
        />
      }
      editItemDialogRef={ref => {
        editOrderModalRef.current = ref;
      }}
      viewItemDialogTitle="Visualizar pedido"
      viewItemDialogDescription="Visualizar um pedido no sistema..."
      viewItemDialogContent={<ViewOrderForm order={selectedOrder} />}
    />
  );
};

export const OrdersTable = memo(OrdersTableComponent);
