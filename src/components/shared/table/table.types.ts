// eslint-disable-next-line import/named
import { Column } from '@tanstack/react-table'

export type TableColumnHeaderProps = {
  column: Column<any>
  title?: string
}

export type TablePaginationProps = {
  previous: {
    onClick: () => void
    disabled: boolean
  }
  next: {
    onClick: () => void
    disabled: boolean
  }
}
