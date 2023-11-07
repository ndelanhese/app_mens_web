import { twMerge } from 'tailwind-merge';
import { FormGridProps } from './formGrid.types';

export const FormGrid = ({ children, className, ...rest }: FormGridProps) => (
  <form
    className={twMerge(
      'grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:max-h-[40rem] sm:grid-cols-2',
      className,
    )}
    {...rest}
  >
    {children}
  </form>
);
