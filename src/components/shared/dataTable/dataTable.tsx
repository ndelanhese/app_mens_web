import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/shadcn/table';

import { nanoid } from 'nanoid';
import { DataTableProps } from './dataTable.types';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

export const DataTable = ({
  caption,
  columns,
  children,
  emptyMessage,
}: DataTableProps) => {
  const message = emptyMessage ?? 'Nenhum dado encontrado.';
  return (
    <Table>
      {(caption || !children) && (
        <TableCaption>{!children ? message : caption ?? message}</TableCaption>
      )}
      {columns && (
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={nanoid()}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      {/* TODO -> make a generic body */}
      {children && <TableBody>{children}</TableBody>}
    </Table>
  );
};
