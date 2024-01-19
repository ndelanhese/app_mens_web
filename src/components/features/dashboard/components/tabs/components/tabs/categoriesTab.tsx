'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { getTopCategoriesReport } from '../../api/api';
import { ReportsResponseData } from '../../api/api.types';
import { ReportsTable } from '../reportsTable/reportsTable';

export const CategoriesTab = () => {
  const { get: getSearchParam } = useSearchParams();

  const page = getSearchParam('page') ?? '1';
  const perPage = getSearchParam('per_page') ?? '8';

  const [categoriesReportData, setCategoriesReportData] = useState<
    ReportsResponseData | undefined
  >(undefined);

  const getCategoriesReportData = useCallback(async () => {
    const response = await getTopCategoriesReport({
      page,
      per_page: perPage,
    });
    setCategoriesReportData(response);
  }, [page, perPage]);

  useEffect(() => {
    getCategoriesReportData();
  }, [getCategoriesReportData]);

  return <ReportsTable data={categoriesReportData?.data} />;
};
