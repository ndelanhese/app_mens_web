import { TableDialog } from '@components/shared/table/tableDialog';

import { twMerge } from 'tailwind-merge';
import { FormGridProps } from './formGrid.types';

export const FormGrid = ({
  children,
  className,
  newItemDialogContent,
  newItemDialogTitle,
  newItemDialogDescription,
  newItemDialogRef,
  ...rest
}: FormGridProps) => (
  <>
    <form
      className={twMerge(
        'grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:max-h-[45rem] sm:grid-cols-2',
        className,
      )}
      {...rest}
    >
      {children}
    </form>
    {newItemDialogContent && (
      <TableDialog
        dialogRef={newItemDialogRef}
        content={newItemDialogContent}
        description={newItemDialogDescription}
        title={newItemDialogTitle}
        isTriggered={false}
      />
    )}
  </>
);
