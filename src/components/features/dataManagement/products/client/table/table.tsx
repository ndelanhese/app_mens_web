'use client';

import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

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
import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';

import { Product, ProductsTableProps } from './table.types';
import { Plus } from 'lucide-react';
import { CreateProductForm } from '../createProductForm/createProductForm';
import { EditProductForm } from '../ediProductForm/editProductForm';
import { ViewProductForm } from '../../server/viewProductForm/viewProductForm';
import { parseCookies } from 'nookies';

const ProductsTableComponent = ({ rows }: ProductsTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createProductModalRef = useRef<RefModalProps | null>(null);
  const editProductModalRef = useRef<RefModalProps | null>(null);

  const [selectedProduct, setSelectProduct] = useState<Product | undefined>(
    undefined,
  );

  const tableColumns: Array<TableColumn<Product>> = useMemo(
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
          <TableColumnHeader column={column} title="Part Number" />
        ),
        accessorKey: 'partNumber',
        id: 'Part Number',
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
          <TableColumnHeader column={column} title="Preço" />
        ),
        accessorKey: 'price',
        id: 'Preço',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Tamanho" />
        ),
        accessorKey: 'size',
        id: 'Tamanho',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Cor" />
        ),
        accessorKey: 'color',
        id: 'Cor',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Quantidade" />
        ),
        accessorKey: 'quantity',
        id: 'Quantidade',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Categoria" />
        ),
        accessorKey: 'category.name',
        id: 'Categoria',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Marca" />
        ),
        accessorKey: 'brand.name',
        id: 'Marca',
      },
    ],
    [],
  );

  const handleDeleteItem = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.refresh();
        toast({
          title: 'Produto deletado com sucesso',
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
    async (row: Product, action: TableActionCallbackOptions) => {
      const { id } = row;

      setSelectProduct(row);

      if (action === 'delete') {
        await handleDeleteItem(id);
      }
    },
    [handleDeleteItem],
  );

  const NEW_PRODUCT_TRIGGER = (
    <StyledDiv>
      Criar novo produto
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewProductModal = useCallback(() => {
    createProductModalRef.current?.close();
    setSelectProduct(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditProductModal = useCallback(() => {
    editProductModalRef.current?.close();
    setSelectProduct(undefined);
    router.refresh();
  }, [router]);

  if (rows.length < 1) {
    return <TableSkeleton />;
  }

  return (
    <Table
      tableColumns={tableColumns}
      rows={rows}
      actionCallback={handleRowClick}
      newItemDialogContent={
        <CreateProductForm handleCloseModal={handleCloseNewProductModal} />
      }
      newItemDialogDescription="Criar um novo produto no sistema."
      newItemDialogTitle="Criar novo produto"
      newItemTrigger={NEW_PRODUCT_TRIGGER}
      newItemDialogRef={ref => {
        createProductModalRef.current = ref;
      }}
      editItemDialogTitle="Editar produto"
      editItemDialogDescription="Editar um produto no sistema..."
      editItemDialogContent={
        <EditProductForm
          handleCloseModal={handleCloseEditProductModal}
          product={selectedProduct}
        />
      }
      editItemDialogRef={ref => {
        editProductModalRef.current = ref;
      }}
      viewItemDialogTitle="Visualizar produto"
      viewItemDialogDescription="Visualizar um produto no sistema..."
      viewItemDialogContent={<ViewProductForm product={selectedProduct} />}
    />
  );
};

export const ProductsTable = memo(ProductsTableComponent);
