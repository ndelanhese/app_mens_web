import { ReactNode } from 'react';

export type DataTableProps = {
  caption?: string;
  columns?: string[];
  children?: ReactNode;
  emptyMessage?: string;
};
