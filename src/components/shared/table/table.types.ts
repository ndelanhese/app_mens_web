import { ReactNode, RefObject } from 'react';

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

export interface RefModalProps {
  open: () => void;
  close: () => void;
}

export type UserTableProps<T> = {
  rows: Array<T>;
  tableColumns: Array<TableColumn<T>>;
  filter: string;
  actionLabel?: string;
  actionCallback: (row: T, action: TableActionCallbackOptions) => void;
  newItemTrigger?: ReactNode;
  newItemDialogTitle?: string;
  newItemDialogDescription?: string;
  newItemDialogContent?: ReactNode;
  newItemDialogRef?: (ref: RefModalProps) => void | undefined;
  editItemDialogTitle?: string;
  editItemDialogDescription?: string;
  editItemDialogContent?: ReactNode;
  editItemDialogRef?: (ref: RefModalProps) => void | undefined;
  viewItemDialogTitle?: string;
  viewItemDialogDescription?: string;
  viewItemDialogContent?: ReactNode;
  viewItemDialogRef?: (ref: RefModalProps) => void | undefined;
};

export type tableDialogProps = {
  title?: string;
  description?: string;
  content?: ReactNode;
  ref?: (ref: RefModalProps) => void | undefined;
  trigger?: ReactNode;
  actionCallback?: (row: any, action: TableActionCallbackOptions) => void;
  row?: any;
  type?: TableActionCallbackOptions;
};
