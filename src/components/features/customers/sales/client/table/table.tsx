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
import { SalesTableProps, Sale } from './table.types';
import { CreateSaleForm } from '../createSaleForm/createSaleForm';
import { EditSaleForm } from '../editSaleForm/editSaleForm';
import { ViewSaleForm } from '../viewSaleForm/viewSaleForm';

const SalesTableComponent = ({ rows }: SalesTableProps) => {
  const router = useRouter();

  const createSaleModalRef = useRef<RefModalProps | null>(null);
  const editSaleModalRef = useRef<RefModalProps | null>(null);

  const [selectedSale, setSelectSale] = useState<Sale | undefined>(undefined);

  const tableColumns: Array<TableColumn<Sale>> = useMemo(
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
          <TableColumnHeader column={column} title="Métodos de pgto" />
        ),
        accessorKey: 'methodsList',
        id: 'Métodos de pgto',
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

  const handleRowClick = useCallback(async (row: Sale) => {
    setSelectSale(row);
  }, []);

  const NEW_SALE_TRIGGER = (
    <StyledDiv>
      Criar nova venda
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewSaleModal = useCallback(() => {
    createSaleModalRef.current?.close();
    setSelectSale(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditSaleModal = useCallback(() => {
    editSaleModalRef.current?.close();
    setSelectSale(undefined);
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
        <CreateSaleForm handleCloseModal={handleCloseNewSaleModal} />
      }
      newItemDialogDescription="Criar uma nova venda no sistema."
      newItemDialogTitle="Criar nova venda"
      newItemTrigger={NEW_SALE_TRIGGER}
      newItemDialogRef={ref => {
        createSaleModalRef.current = ref;
      }}
      editItemDialogTitle="Editar venda"
      editItemDialogDescription="Editar uma venda no sistema..."
      editItemDialogContent={
        <EditSaleForm
          sale={selectedSale}
          handleCloseModal={handleCloseEditSaleModal}
        />
      }
      editItemDialogRef={ref => {
        editSaleModalRef.current = ref;
      }}
      viewItemDialogTitle="Visualizar venda"
      viewItemDialogDescription="Visualizar uma venda no sistema..."
      viewItemDialogContent={<ViewSaleForm sale={selectedSale} />}
    />
  );
};

export const SalesTable = memo(SalesTableComponent);
