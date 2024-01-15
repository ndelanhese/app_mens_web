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
import { twMerge } from 'tailwind-merge';

const TableDialogComponent = ({
  content,
  description,
  dialogRef,
  title,
  trigger,
  isTriggered = true,
  actionCallback,
  row,
  type,
  className,
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
      {isTriggered && <DialogTrigger>{trigger ?? 'Abrir Modal'}</DialogTrigger>}
      <DialogContent
        className={twMerge(
          'flex h-full w-full flex-col gap-4 bg-white-100 sm:h-auto sm:w-auto sm:min-w-[60rem]',
          className,
        )}
      >
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
