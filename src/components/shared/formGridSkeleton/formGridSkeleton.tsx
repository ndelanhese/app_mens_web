import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Skeleton } from '@components/ui/shadcn/skeleton';
import React from 'react';

import { Button } from '@/components/ui/buttons/button';

import { FormGridSkeletonProps } from './formGridSkeleton.types';

export const FormGridSkeleton = ({
  qtyOfInputs = 1,
}: FormGridSkeletonProps) => {
  const elements = Array.from({ length: qtyOfInputs }, (_, index) => (
    <div key={index} className="flex flex-col py-1 transition-colors">
      <label className="mb-2 text-zinc-900 dark:text-white-80">
        <Skeleton className="h-4 w-20" />
      </label>
      <div className="relative flex w-full flex-row items-center">
        <div className="flex w-full flex-col gap-1">
          <div className="rounded border border-black-10 px-4 py-4  dark:border-white-10 dark:bg-zinc-950 dark:text-white-100 dark:placeholder:text-white-20 dark:focus:border-white-40">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <FormGrid>
      {elements}
      <Button isLoading className="h-fit w-full sm:col-start-2">
        <Skeleton className="h-4 w-20" />
      </Button>
    </FormGrid>
  );
};
