'use client';

import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { NumberInput } from '@components/ui/inputs/numberInput';
import { Button } from '@components/ui/shadcn/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const reportsFiltersSchema = z.object({
  initial_date: z.string().optional(),
  final_date: z.string().optional(),
});

type ReportsFiltersSchema = z.infer<typeof reportsFiltersSchema>;

export const ReportsTableFilters = () => {
  const { get: getSearchParam, entries } = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialDate =
    getSearchParam('products_initial_date') ??
    getSearchParam('mop_initial_date');
  const finalDate =
    getSearchParam('products_final_date') ?? getSearchParam('mop_final_date');
  const subTab = getSearchParam('sub_tab');
  const tab = getSearchParam('tab');

  const { handleSubmit, reset, control } = useForm<ReportsFiltersSchema>({
    resolver: zodResolver(reportsFiltersSchema),
    defaultValues: {
      initial_date: initialDate ?? '',
      final_date: finalDate ?? '',
    },
  });

  const handleFilter: SubmitHandler<ReportsFiltersSchema> = ({
    final_date: finalDateInput,
    initial_date: initialDateInput,
  }) => {
    const current = new URLSearchParams(Array.from(entries()));
    if (subTab === 'products' ?? !subTab) {
      if (finalDateInput) {
        current.set('products_final_date', finalDateInput);
      } else {
        current.delete('products_final_date');
      }

      if (initialDateInput) {
        current.set('products_initial_date', initialDateInput);
      } else {
        current.delete('products_initial_date');
      }
    }

    if (subTab === 'methods_of_payments') {
      if (finalDateInput) {
        current.set('mop_final_date', finalDateInput);
      } else {
        current.delete('mop_final_date');
      }
      if (initialDateInput) {
        current.set('mop_initial_date', initialDateInput);
      } else {
        current.delete('mop_initial_date');
      }
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  const handleClearFilters = () => {
    router.push(`${pathname}?tab=${tab}&sub_tab=${subTab ?? 'products'}`);
    reset({
      initial_date: '',
      final_date: '',
    });
  };

  if (subTab === 'categories' || subTab === 'brands') {
    return;
  }

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row sm:items-center"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <MaskedInput
        id="initial_date"
        control={control}
        placeholder="Data inicial"
        mask="99/99/9999"
        className="h-8"
        inputMode="numeric"
      />
      <MaskedInput
        id="final_date"
        control={control}
        placeholder="Data final"
        mask="99/99/9999"
        className="h-8"
        inputMode="numeric"
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
};
