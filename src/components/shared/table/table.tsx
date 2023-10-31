'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/shadcn/button';
import { StyledDiv } from '@/components/ui/styledDiv/styledDiv';

import { TablePagination } from '@components/shared/table/tablePagination';
import { AlertDialog } from '@components/ui/alertDialog/alertDialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/shadcn/dropdownMenu';
import { Input } from '@components/ui/shadcn/input';
import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/shadcn/table';

/* eslint-disable import/named */
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye, Pencil, Search, Trash } from 'lucide-react';
import { UserTableProps } from './table.types';
import { TableDialog } from './tableDialog';

export function Table<T>({
  rows,
  tableColumns,
  actionCallback,
  newItemDialogContent,
  newItemDialogTitle,
  newItemDialogDescription,
  newItemTrigger,
  newItemDialogRef,
  editItemDialogContent,
  editItemDialogTitle,
  editItemDialogDescription,
  editItemDialogRef,
  viewItemDialogContent,
  viewItemDialogTitle,
  viewItemDialogDescription,
  viewItemDialogRef,
  deleteItemDescription,
  deleteItemTitle,
}: UserTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
  });

  const DELETE_ITEM_TRIGGER = (
    <StyledDiv>
      <Trash className="h-4 w-4" />
    </StyledDiv>
  );

  const EDIT_ITEM_TRIGGER = (
    <StyledDiv>
      <Pencil className="h-4 w-4" />
    </StyledDiv>
  );

  const VIEW_ITEM_TRIGGER = (
    <StyledDiv>
      <Eye className="h-4 w-4" />
    </StyledDiv>
  );

  return (
    <div className="flex w-full flex-col items-start justify-start pb-3">
      <div className="flex w-full flex-col justify-between sm:flex-row sm:items-end">
        <div className="relative flex flex-row items-center">
          <div className="absolute left-2 flex flex-row items-center gap-1">
            <Search className="h-4 w-4" />
          </div>
          <Input
            id="search"
            className="pl-8"
            placeholder="Pesquisar..."
            value={globalFilter ?? ''}
            onChange={({ target }) => setGlobalFilter(String(target.value))}
          />
        </div>
        <div className="mt-2 flex flex-row items-center justify-between gap-2 sm:mt-0">
          <TableDialog
            dialogRef={newItemDialogRef}
            trigger={newItemTrigger}
            content={newItemDialogContent}
            description={newItemDialogDescription}
            title={newItemDialogTitle}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Colunas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TableComponent>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
              <TableHead className="text-right"></TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="ml-8 flex items-end justify-end gap-1 sm:ml-0">
                  <TableDialog
                    dialogRef={viewItemDialogRef}
                    trigger={VIEW_ITEM_TRIGGER}
                    content={viewItemDialogContent}
                    description={viewItemDialogDescription}
                    title={viewItemDialogTitle}
                    actionCallback={actionCallback}
                    row={row.original}
                    type="view"
                  />
                  <TableDialog
                    dialogRef={editItemDialogRef}
                    trigger={EDIT_ITEM_TRIGGER}
                    content={editItemDialogContent}
                    description={editItemDialogDescription}
                    title={editItemDialogTitle}
                    actionCallback={actionCallback}
                    row={row.original}
                    type="edit"
                  />
                  <AlertDialog
                    actionLabel="Confirmar"
                    cancelLabel="Cancelar"
                    description={
                      deleteItemDescription ??
                      'Você tem certeza que deseja excluir este item?'
                    }
                    onAction={() => actionCallback(row.original, 'delete')}
                    title={deleteItemTitle ?? 'Excluir'}
                    trigger={DELETE_ITEM_TRIGGER}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableColumns.length + 1}
                className="h-full w-full text-center"
              >
                Sem resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableComponent>

      <TablePagination
        previous={{
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
        }}
        next={{
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
        }}
      />
    </div>
  );
}
