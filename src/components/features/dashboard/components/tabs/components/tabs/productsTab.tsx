'use client';

import { revertDateFormat } from '@utils/helpers/date';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { getProductsReport } from '../../api/api';
import { ReportsResponseData } from '../../api/api.types';
import { ReportsTable } from '../reportsTable/reportsTable';

export const ProductsTab = () => {
  const { get: getSearchParam } = useSearchParams();

  const initialDate = getSearchParam('products_initial_date') ?? undefined;
  const finalDate = getSearchParam('products_final_date') ?? undefined;
  const page = getSearchParam('page') ?? '1';
  const perPage = getSearchParam('per_page') ?? '8';

  const [productsReportData, setProductsReportData] = useState<
    ReportsResponseData | undefined
  >(undefined);

  const getProductsReportData = useCallback(async () => {
    const response = await getProductsReport({
      final_date: finalDate ? revertDateFormat(finalDate) : undefined,
      initial_date: initialDate ? revertDateFormat(initialDate) : undefined,
      page,
      per_page: perPage,
    });
    setProductsReportData(response);
  }, [finalDate, initialDate, page, perPage]);

  useEffect(() => {
    getProductsReportData();
  }, [getProductsReportData]);

  return <ReportsTable data={productsReportData?.data} />;
};
