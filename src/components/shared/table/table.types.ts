// eslint-disable-next-line import/named
import { Column } from '@tanstack/react-table';
import { ReactNode } from 'react';

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

export type UserTableProps<T> =
  | {
      rows: Array<T>;
      tableColumns: Array<TableColumn<T>>;
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
      deleteItemTitle?: string;
      deleteItemDescription?: string;
      rowIsClickable?: true;
      handleRowClick: (row: T) => void;
      permissionPrefix?: string;
    }
  | {
      rows: Array<T>;
      tableColumns: Array<TableColumn<T>>;
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
      deleteItemTitle?: string;
      deleteItemDescription?: string;
      rowIsClickable?: false;
      handleRowClick?: () => void;
      permissionPrefix?: string;
    };

export type tableDialogProps = {
  title?: string;
  description?: string;
  content?: ReactNode;
  dialogRef?: (ref: RefModalProps) => void | undefined;
  isTriggered?: boolean;
  trigger?: ReactNode;
  actionCallback?: (row: any, action: TableActionCallbackOptions) => void;
  row?: any;
  type?: TableActionCallbackOptions;
  className?: string;
};
