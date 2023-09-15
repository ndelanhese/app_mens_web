'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

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
  const [value, setValue] = useState(defaultValue ?? '');

  const handleValueChange = (currentValue: string) => {
    const selectedValue =
      options.find(
        option =>
          option.label.toLocaleLowerCase() === currentValue.toLocaleLowerCase(),
      )?.value ?? '';
    setValue(selectedValue === value ? '' : selectedValue);
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
          {value
            ? options.find(option => option.value === value)?.label
            : placeHolder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-[19.5rem] p-0 sm:w-[29rem]">
        <Command>
          <CommandInput placeholder={searchLabel ?? 'Pesquisar...'} />
          <CommandEmpty>{emptyLabel ?? 'Sem resultados'}</CommandEmpty>
          <CommandGroup>
            {options.map(option => (
              <CommandItem key={option.value} onSelect={handleValueChange}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};