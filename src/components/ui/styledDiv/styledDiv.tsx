import { twMerge } from 'tailwind-merge';

import { StyledDiveProps } from './styledDiv.types';

export const StyledDiv = ({ children, className }: StyledDiveProps) => (
  <div
    className={twMerge(
      'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white-100 px-3 text-sm font-medium ring-offset-white-100 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
      className,
    )}
  >
    {children}
  </div>
);
