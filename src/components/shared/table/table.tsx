'use client';

import { TablePagination } from '@components/shared/table/tablePagination';
import { AlertDialog } from '@components/ui/alertDialog/alertDialog';
import { Button } from '@components/ui/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/shadcn/dropdownMenu';
import { Input } from '@components/ui/shadcn/input';
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/shadcn/table';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';
/* eslint-disable import/named */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { validateIfTheUserHasPermission } from '@utils/permissions';
import { Eye, Pencil, Search, Trash } from 'lucide-react';
import { parseCookies } from 'nookies';
import { useMemo, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { TableSkeleton } from '../skeleton/tableSkeleton/tableSkeleton';
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
  rowIsClickable,
  handleRowClick,
  permissionPrefix,
}: UserTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'id', desc: true },
  ]);
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
    initialState: {
      pagination: {
        pageSize: 9,
      },
    },
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

  const userHasPermission = useMemo(() => {
    const can = {
      toCreate: true,
      toEdit: true,
      toDelete: true,
    };
    if (!permissionPrefix) return can;
    const createPermissionName = `${permissionPrefix}_create`;
    const editPermissionName = `${permissionPrefix}_update`;
    const deletePermissionName = `${permissionPrefix}_delete`;

    const { permission_one: permissionsOne, permission_two: permissionsTwo } =
      parseCookies();

    const userPermissions = `${permissionsOne ?? ''}${permissionsTwo ?? ''}`;

    const userCanCreate = validateIfTheUserHasPermission(
      createPermissionName,
      userPermissions,
    );
    can.toCreate = userCanCreate;

    const userCanEdit = validateIfTheUserHasPermission(
      editPermissionName,
      userPermissions,
    );
    can.toEdit = userCanEdit;

    const userCanDelete = validateIfTheUserHasPermission(
      deletePermissionName,
      userPermissions,
    );
    can.toDelete = userCanDelete;

    return can;
  }, [permissionPrefix]);

  if (!rows) {
    return <TableSkeleton />;
  }

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
        <div
          className={twJoin(
            'mt-2 flex flex-row items-center gap-2 sm:mt-0',
            newItemDialogContent ? 'justify-between' : 'justify-end',
          )}
        >
          {newItemDialogContent && userHasPermission?.toCreate && (
            <TableDialog
              dialogRef={newItemDialogRef}
              trigger={newItemTrigger}
              content={newItemDialogContent}
              description={newItemDialogDescription}
              title={newItemDialogTitle}
            />
          )}
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
              {(viewItemDialogContent ||
                editItemDialogContent ||
                deleteItemTitle) && (
                <TableHead className="text-right"></TableHead>
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={rowIsClickable ? 'cursor-pointer' : ''}
                {...(rowIsClickable
                  ? {
                      onClick: () => {
                        if (handleRowClick) {
                          handleRowClick(row.original);
                        }
                      },
                    }
                  : {})}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {(viewItemDialogContent ||
                  editItemDialogContent ||
                  deleteItemTitle) && (
                  <TableCell className="ml-8 flex items-end justify-end gap-1 sm:ml-0">
                    {viewItemDialogContent && (
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
                    )}
                    {editItemDialogContent && userHasPermission?.toEdit && (
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
                    )}
                    {deleteItemTitle && userHasPermission?.toDelete && (
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
                    )}
                  </TableCell>
                )}
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

      {(table.getCanPreviousPage() || table.getCanNextPage()) && (
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
      )}
    </div>
  );
}
