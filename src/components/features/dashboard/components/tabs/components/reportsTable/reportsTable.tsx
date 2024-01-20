'use client';

import { Pagination } from '@components/shared/pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/shadcn/table';
import { useSearchParams } from 'next/navigation';

import { ReportsResponseData } from '../../api/api.types';
import { ReportsTableFilters } from './reportsTableFilters';
import { ReportsTableRow } from './reportsTableRow';

export const ReportsTable = ({
  data,
}: {
  data: ReportsResponseData | undefined;
}) => {
  const { get: getSearchParam } = useSearchParams();

  const subTab = getSearchParam('sub_tab');

  return (
    <div className="mt-4 space-y-2.5">
      <ReportsTableFilters />
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-36">Código</TableHead>
              <TableHead className="w-36">Nome</TableHead>
              {subTab === 'products' && (
                <TableHead className="w-44">Descrição</TableHead>
              )}
              <TableHead className="w-36">Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((row, index) => (
              <ReportsTableRow
                key={`${index}-row`}
                id={row.id}
                name={row.name}
                quantity={row.quantity}
                description={row?.description}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        pageIndex={data?.page ?? 1}
        perPage={data?.per_page ?? 8}
        totalCount={data?.total ?? 1}
      />
    </div>
  );
};
