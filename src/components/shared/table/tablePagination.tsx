'use client'

import { Button } from '@components/ui/shadcn/button'

import { TablePaginationProps } from './table.types'

export const TablePagination = ({ previous, next }: TablePaginationProps) => (
  <div className="flex w-full items-center justify-end space-x-2 py-4">
    <Button
      variant="default"
      size="sm"
      onClick={previous.onClick}
      disabled={previous.disabled}
    >
      Anterior
    </Button>
    <Button
      variant="default"
      size="sm"
      onClick={next.onClick}
      disabled={next.disabled}
    >
      Próxima
    </Button>
  </div>
)
