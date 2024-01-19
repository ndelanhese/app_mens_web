import { RefModalProps } from '@components/shared/table/table.types';
import { HTMLProps, ReactNode } from 'react';

export type FormGridProps = HTMLProps<HTMLFormElement> & {
  newItemDialogTitle?: string;
  newItemDialogDescription?: string;
  newItemDialogContent?: ReactNode;
  newItemDialogRef?: (ref: RefModalProps) => void | undefined;
};
