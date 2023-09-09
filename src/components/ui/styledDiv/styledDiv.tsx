import { twMerge } from 'tailwind-merge';
import { StyledDiveProps } from './styledDiv.types';

export const StyledDiv = ({ children, className }: StyledDiveProps) => (
  <div
    className={twMerge(
      'ring-offset-white bg-white inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
      className,
    )}
  >
    {children}
  </div>
);
