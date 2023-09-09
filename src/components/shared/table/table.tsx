'use client';

import { useCallback, useEffect, useState } from 'react';
import { table } from 'console';

import { Button } from '@/components/ui/shadcn/button';
import { StyledDiv } from '@/components/ui/styledDiv/styledDiv';

import { TablePagination } from '@components/shared/table/tablePagination';
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
import { AlertDialog } from '@components/ui/alertDialog/alertDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/shadcn/dialog';

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
import { RefModalProps, UserTableProps } from './table.types';
import { Eye, Pencil, Trash } from 'lucide-react';

export function Table<T>({
  rows,
  tableColumns,
  filter,
  actionCallback,
  newItemDialogContent,
  newItemDialogTitle,
  newItemDialogDescription,
  newItemTrigger,
  newItemDialogRef,
}: UserTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const DELETE_ITEM_TRIGGER = (
    <StyledDiv>
      <Trash className="h-4 w-4" />
    </StyledDiv>
  );

  useEffect(() => {
    if (newItemDialogRef) {
      const ref: RefModalProps = {
        open: () => setOpen(true),
        close: () => setOpen(false),
      };
      newItemDialogRef(ref);
    }
  }, [newItemDialogRef]);

  return (
    <div className="flex w-full flex-col items-start justify-start pb-3">
      <div className="flex w-full flex-col justify-between sm:flex-row sm:items-end">
        <Input
          id="search"
          className="sm:max-w-xs"
          placeholder="Pesquisar..."
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }
        />
        <div className="mt-2 flex flex-row items-center justify-between gap-2 sm:mt-0">
          <Dialog
            open={open}
            onOpenChange={isOpen => {
              setOpen(isOpen);
            }}
          >
            <DialogTrigger>{newItemTrigger ?? 'Criar novo'}</DialogTrigger>
            <DialogContent className="flex h-full w-full flex-col gap-4 sm:h-auto sm:w-auto">
              <DialogHeader>
                <DialogTitle>
                  {newItemDialogTitle ?? 'Criar novo item'}
                </DialogTitle>
                <DialogDescription>
                  {newItemDialogDescription ?? 'Criar novo registro'}
                </DialogDescription>
              </DialogHeader>
              {newItemDialogContent}
            </DialogContent>
          </Dialog>
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
                  <Button
                    onClick={() => {
                      actionCallback(row.original, 'view');
                    }}
                    variant="outline"
                    size="icon"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      actionCallback(row.original, 'edit');
                    }}
                    variant="outline"
                    size="icon"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog
                    actionLabel="Confirmar"
                    cancelLabel="Cancelar"
                    description="Você tem certeza que deseja excluir este item?"
                    onAction={() => actionCallback(row.original, 'delete')}
                    title="Excluir"
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
