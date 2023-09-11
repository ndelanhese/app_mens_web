import { memo, useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/shadcn/dialog';

import { RefModalProps, tableDialogProps } from './table.types';

const TableDialogComponent = ({
  content,
  description,
  ref,
  title,
  trigger,
  actionCallback,
  row,
  type,
}: tableDialogProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref) {
      const reference: RefModalProps = {
        open: () => setOpen(true),
        close: () => setOpen(false),
      };
      ref(reference);
    }
  }, [ref]);

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        setOpen(isOpen);
        if (isOpen && actionCallback && row && type) {
          actionCallback(row, type);
        }
      }}
    >
      <DialogTrigger>{trigger ?? 'Abrir Modal'}</DialogTrigger>
      <DialogContent className="flex h-full w-full flex-col gap-4 sm:h-auto sm:w-auto">
        <DialogHeader>
          <DialogTitle>{title ?? 'Titulo'}</DialogTitle>
          <DialogDescription>{description ?? 'Descrição'}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export const TableDialog = memo(TableDialogComponent);
