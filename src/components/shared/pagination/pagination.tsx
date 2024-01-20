'use client';

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/shadcn/pagination';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

import { PaginationProps } from './pagination.types';

export const Pagination = ({
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) => {
  const { entries } = useSearchParams();
  const pathname = usePathname();

  const pages = Math.ceil(totalCount / perPage) || 1;
  const previousPage = pageIndex <= 1 ? 1 : pageIndex - 1;
  const nextPage = pageIndex + 1 >= pages ? pages : pageIndex + 1;

  const handleChangePage = (page: number) => {
    const current = new URLSearchParams(Array.from(entries()));

    current.set('page', page.toString());
    current.set('per_page', '8');

    const search = current.toString();
    const query = search ? `?${search}` : '';

    return `${pathname}${query}`;
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <span className="w-full text-sm font-medium">
          Página {pageIndex} de {pages}
        </span>

        <ShadcnPagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={handleChangePage(1)}
                icon={ChevronsLeft}
                label="Primeira página"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                href={handleChangePage(previousPage)}
                icon={ChevronLeft}
                label="Página anterior"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={handleChangePage(nextPage)}
                icon={ChevronRight}
                label="Próxima página"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={handleChangePage(pages)}
                icon={ChevronsRight}
                label="Ultima página"
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      </div>
    </div>
  );
};
