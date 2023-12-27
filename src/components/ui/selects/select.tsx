'use client';

import { useState } from 'react';

import { cn } from '@shadcn-utils';

import { Button } from '@components/ui/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@components/ui/shadcn/command/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/shadcn/popover';

import { Check, ChevronDown } from 'lucide-react';
import { SelectProps } from './select.types';

export const Combobox = ({
  options,
  placeHolder,
  searchLabel,
  emptyLabel,
  defaultValue,
  onChange,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [key, setValue] = useState<string | undefined>(
    defaultValue ?? undefined,
  );

  const handleValueChange = (currentValue: string) => {
    const selectedValue =
      options?.find(
        option => option?.value.toLowerCase() === currentValue?.toLowerCase(),
      )?.key ?? undefined;
    setValue(selectedValue === key ? undefined : selectedValue);
    setOpen(false);

    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg py-6 text-md font-re"
        >
          {key ? (
            options?.find(option => option.key === key)?.value
          ) : (
            <span className="text-zinc-700">{placeHolder}</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-[23.5rem] p-0 sm:w-[29rem]">
        <Command>
          <CommandInput placeholder={searchLabel ?? 'Pesquisar...'} />
          <CommandEmpty>{emptyLabel ?? 'Sem resultados'}</CommandEmpty>
          <CommandGroup className="max-h-80">
            {options?.map(option => (
              <CommandItem key={option?.key} onSelect={handleValueChange}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    key === option.key ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {option.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
