'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { getTopBrandsReport } from '../../api/api';
import { ReportsResponseData } from '../../api/api.types';
import { ReportsTable } from '../reportsTable/reportsTable';

export const BrandsTab = () => {
  const { get: getSearchParam } = useSearchParams();

  const page = getSearchParam('page') ?? '1';
  const perPage = getSearchParam('per_page') ?? '8';

  const [brandsReportData, setBrandsReportData] = useState<
    ReportsResponseData | undefined
  >(undefined);

  const getBrandsReportData = useCallback(async () => {
    const response = await getTopBrandsReport({
      page,
      per_page: perPage,
    });
    setBrandsReportData(response);
  }, [page, perPage]);

  useEffect(() => {
    getBrandsReportData();
  }, [getBrandsReportData]);

  return <ReportsTable data={brandsReportData} />;
};
