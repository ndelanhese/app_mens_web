'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Table } from '@/components/shared/table/table';
import { TableColumn } from '@/components/shared/table/table.types';
import { TableColumnHeader } from '@/components/shared/table/tableColumnHeader';
import { TableDialog } from '@/components/shared/table/tableDialog';
import { StyledDiv } from '@/components/ui/styledDiv/styledDiv';

import { Plus } from 'lucide-react';
import { Products } from './api/apiData.types';
import { Product, SearchProductModalProps } from './searchProductModal.types';
// eslint-disable-next-line import/namespace
import { getProducts } from './api/apiData';

export const SearchProductModal = ({
  triggerIcon,
  triggerText,
  modalRef,
  description,
  title,
  handleRowClick: rowClick,
  handleCloseModal,
}: SearchProductModalProps) => {
  const [products, setProducts] = useState<Product[] | []>([]);

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

  const iterateProductResponse = (products?: Products) => {
    if (!products) return [];
    return products?.data?.map(product => ({
      id: product?.id,
      name: product?.name,
      partNumber: product?.part_number,
      description: product?.description,
      price: product?.final_price ?? product.price_formatted,
      size: product?.size,
      color: product?.color,
      quantity: product?.quantity,
      category: product?.category,
      brand: product?.brand,
      supplier: product.supplier,
    }));
  };

  const TRIGGER = (
    <StyledDiv className="w-fit">
      {triggerText ?? 'Adicionar produto'}{' '}
      {triggerIcon ?? <Plus className="h-4 w-4" />}
    </StyledDiv>
  );

  const getProductsData = useCallback(async () => {
    const productsResponse = await getProducts();
    setProducts(iterateProductResponse(productsResponse));
  }, []);

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  const handleRowClick = useCallback(
    (row: Product) => {
      rowClick(row);
      handleCloseModal && handleCloseModal();
    },
    [handleCloseModal, rowClick],
  );

  return (
    <TableDialog
      dialogRef={modalRef}
      trigger={TRIGGER}
      content={
        <Table
          actionCallback={() => {
            console.log('ops');
          }}
          tableColumns={tableColumns}
          rows={products}
          rowIsClickable
          handleRowClick={handleRowClick}
        />
      }
      description={description ?? 'Encontre um produto já cadastrado'}
      title={title ?? 'Selecionar produto'}
      className="w-screen sm:min-w-fit"
    />
  );
};
