'use client';

import { Checkbox } from '@components/ui/shadcn/checkbox';

import { twJoin } from 'tailwind-merge';
import { CheckboxItemProps } from './checkboxItem.types';

export const CheckboxItem = ({
  id,
  title,
  description,
  checked = false,
  handleChange,
  handleChildrenChange,
}: CheckboxItemProps) => (
  <div
    className={twJoin(
      'flex space-x-2',
      description ? 'items-top ' : 'items-center',
    )}
  >
    <Checkbox
      id={id.toString()}
      checked={checked}
      onCheckedChange={event => {
        handleChange?.(event);
        handleChildrenChange?.(id);
      }}
      className="rounded"
    />
    <div className="grid gap-1.5 leading-none">
      <label
        htmlFor={id.toString()}
        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {title}
      </label>
      {description && (
        <label
          className="text-muted-foreground cursor-pointer text-sm"
          htmlFor={id.toString()}
        >
          {description}
        </label>
      )}
    </div>
  </div>
);
