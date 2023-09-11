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
  dialogRef,
  title,
  trigger,
  actionCallback,
  row,
  type,
}: tableDialogProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dialogRef) {
      const ref: RefModalProps = {
        open: () => setOpen(true),
        close: () => setOpen(false),
      };
      dialogRef(ref);
    }
  }, [dialogRef]);

  useEffect(() => {
    if (open && actionCallback && row && type) {
      actionCallback(row, type);
    }
  }, [actionCallback, open, row, type]);

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        setOpen(isOpen);
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