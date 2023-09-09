import { ReactNode } from 'react';

export type AlertDialogProps = {
  triggerLabel?: string;
  trigger?: ReactNode;
  title: string;
  description: string;
  cancelLabel: string;
  actionLabel: string;
  onAction: () => void;
};
