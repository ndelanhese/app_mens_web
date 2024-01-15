'use client';

import { useEffect } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '@components/ui/shadcn/command/command';

import { CommandKeyProps } from './commandKey.types';
import { CommandKeyItems } from './commandKeyItems';

export function CommandKey({ open, setOpen }: CommandKeyProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open: boolean) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  return (
    <>
      <p className="text-muted-foreground text-sm">
        <kbd className="bg-muted font-mono text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Pesquise..." />
        <CommandList>
          <CommandEmpty>Sem resultados.</CommandEmpty>
          <CommandKeyItems setOpen={setOpen} />
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
