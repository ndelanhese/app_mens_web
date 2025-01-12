'use client';

import { useState } from 'react';

import { CommandKey } from './commandKey';

export const CommandKeySearchBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden cursor-pointer items-center space-x-3 rounded-md border border-black-10 px-2 py-2 dark:border-white-5 sm:flex">
      <button
        type="button"
        onClick={() => setOpen(open => !open)}
        className="text-sm"
      >
        Pesquise um serviço
      </button>
      <CommandKey open={open} setOpen={setOpen} />
    </div>
  );
};
