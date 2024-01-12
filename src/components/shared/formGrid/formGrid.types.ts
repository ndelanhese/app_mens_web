import { HTMLProps, ReactNode } from 'react';

import { RefModalProps } from '@components/shared/table/table.types';

export type FormGridProps = HTMLProps<HTMLFormElement> & {
  newItemDialogTitle?: string;
  newItemDialogDescription?: string;
  newItemDialogContent?: ReactNode;
  newItemDialogRef?: (ref: RefModalProps) => void | undefined;
};
