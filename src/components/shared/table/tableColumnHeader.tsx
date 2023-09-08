import { Button } from '@components/ui/shadcn/button';

import { ArrowUpDown } from 'lucide-react';
import { TableColumnHeaderProps } from './table.types';

export const TableColumnHeader = ({
  column,
  title,
}: TableColumnHeaderProps) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    className="-ml-4"
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
