'use client';

import {
  AlertDialog as ShadCNAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../shadcn/alertDialog';
import { AlertDialogProps } from './alertDialog.types';

export const AlertDialog = ({
  actionLabel,
  cancelLabel,
  description,
  onAction,
  title,
  trigger,
  triggerLabel,
}: AlertDialogProps) => {
  return (
    <ShadCNAlertDialog>
      <AlertDialogTrigger>{trigger ?? triggerLabel}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ShadCNAlertDialog>
  );
};
