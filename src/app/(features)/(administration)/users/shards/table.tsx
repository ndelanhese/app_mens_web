/* eslint-disable import/named */
'use client'

import { useMemo, useState } from 'react'

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/shadcn/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/shadcn/dropdownMenu'
import { Button } from '@components/ui/shadcn/button'
import { Input } from '@components/ui/shadcn/input'
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader'
import { TablePagination } from '@components/shared/table/tablePagination'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { Representative, UserTableProps } from './table.types'

export const Table = ({ columns, rows }: UserTableProps) => {
  const tableColumns: Array<ColumnDef<Representative>> = useMemo(
    () => [
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Representante" />
        ),
        accessorKey: 'representative',
        id: 'Representante',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="CPF/CNPJ" />
        ),
        accessorKey: 'cpfCnpj',
        id: 'CPF/CNPJ',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Registro" />
        ),
        accessorKey: 'registration',
        id: 'Registro',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Equipe" />
        ),
        accessorKey: 'teamCode',
        id: 'Equipe',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Filial" />
        ),
        accessorKey: 'branchCode',
        id: 'Filial',
      },
    ],
    [],
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

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
  })

  return (
    <div className="flex w-full flex-col items-start justify-start pb-3">
      <div className="flex w-full flex-row items-end justify-between">
        <Input
          id="search"
          placeholder="Pesquisar..."
          value={
            (table.getColumn('Representante')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('Representante')?.setFilterValue(event.target.value)
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Colunas</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TableComponent>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead className="text-left "></TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
              <TableHead className="text-right"></TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                <TableCell>{Number(row.id) + 1}</TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="ml-8 flex items-end justify-end sm:ml-0">
                  <button>action</button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-full text-center"
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
  )
}
