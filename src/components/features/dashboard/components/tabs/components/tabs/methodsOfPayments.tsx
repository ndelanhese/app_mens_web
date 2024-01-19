'use client';

import { revertDateFormat } from '@utils/helpers/date';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { getMethodsOfPaymentsReport } from '../../api/api';
import { ReportsResponseData } from '../../api/api.types';
import { ReportsTable } from '../reportsTable/reportsTable';

export const MethodsOfPaymentsTab = () => {
  const { get: getSearchParam } = useSearchParams();

  const initialDate = getSearchParam('mop_initial_date') ?? undefined;
  const finalDate = getSearchParam('mop_final_date') ?? undefined;
  const page = getSearchParam('page') ?? '1';
  const perPage = getSearchParam('per_page') ?? '8';

  const [methodsOfPaymentsReportData, setMethodsOfPaymentsReportData] =
    useState<ReportsResponseData | undefined>(undefined);

  const getMethodsOfPaymentsReportData = useCallback(async () => {
    const response = await getMethodsOfPaymentsReport({
      final_date: finalDate ? revertDateFormat(finalDate) : undefined,
      initial_date: initialDate ? revertDateFormat(initialDate) : undefined,
      page,
      per_page: perPage,
    });
    setMethodsOfPaymentsReportData(response);
  }, [finalDate, initialDate, page, perPage]);

  useEffect(() => {
    getMethodsOfPaymentsReportData();
  }, [getMethodsOfPaymentsReportData]);

  return <ReportsTable data={methodsOfPaymentsReportData} />;
};
