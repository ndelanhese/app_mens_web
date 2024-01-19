import { TableCell, TableRow } from '@components/ui/shadcn/table';
import { useSearchParams } from 'next/navigation';

type ReportsTableRowProps = {
  id: number;
  name: string;
  description?: string;
  quantity: number;
};

export const ReportsTableRow = ({
  id,
  name,
  quantity,
  description,
}: ReportsTableRowProps) => {
  const { get: getSearchParam } = useSearchParams();

  const subTab = getSearchParam('sub_tab');

  return (
    <TableRow>
      <TableCell className="font-mono text-sm font-medium">{id}</TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      {subTab === 'products' && (
        <TableCell className="font-medium">{description}</TableCell>
      )}
      <TableCell className="font-medium">{quantity}</TableCell>
    </TableRow>
  );
};
