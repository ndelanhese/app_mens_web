import { twMerge } from 'tailwind-merge';
import { FormGridProps } from './formGrid.types';

export const FormGrid = ({ children, className }: FormGridProps) => (
  <form
    className={twMerge(
      'grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:max-h-[30rem] sm:grid-cols-2',
      className,
    )}
  >
    {children}
  </form>
);
