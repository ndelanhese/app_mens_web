// eslint-disable-next-line import/named
import { Column } from '@tanstack/react-table';

export type TableColumnHeaderProps = {
  column: Column<any>;
  title?: string;
};

export type TablePaginationProps = {
  previous: {
    onClick: () => void;
    disabled: boolean;
  };
  next: {
    onClick: () => void;
    disabled: boolean;
  };
};

export type TableColumn<T> = {
  header: ({ column }: { column: Column<T> }) => JSX.Element;
  accessorKey: string;
  id: string;
};

export type TableActionCallbackOptions = 'view' | 'edit' | 'delete';

export type UserTableProps<T> = {
  rows: Array<T>;
  tableColumns: Array<TableColumn<T>>;
  filter: string;
  actionLabel: string;
  actionCallback: (row: T, action: TableActionCallbackOptions) => void;
};
