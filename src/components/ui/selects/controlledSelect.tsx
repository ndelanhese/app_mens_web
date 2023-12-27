'use client';

import { memo } from 'react';

import { Controller } from 'react-hook-form';
import { Combobox } from './select';
import { SelectProps } from './controlledSelect.types';
import { twMerge } from 'tailwind-merge';

const ControlledSelectComponent = ({
  name,
  label,
  options,
  placeHolder,
  isRequired = false,
  searchLabel,
  emptyLabel,
  defaultValue,
  className,
  errorMessage,
  control,
}: SelectProps) => {
  // TODO -> Fix vertical scroll (isn't work)
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field: { onChange, value } }) => (
        <div className={twMerge('flex flex-col transition-colors', className)}>
          <label className="mb-2 text-black-40 dark:text-white-80">
            {label} {isRequired && <span className="text-red-700"> *</span>}
          </label>
          <Combobox
            options={options}
            placeHolder={placeHolder}
            searchLabel={searchLabel}
            emptyLabel={emptyLabel}
            defaultValue={value}
            onChange={onChange}
          />
          {errorMessage && (
            <span className="text-sm text-red-600">{errorMessage}</span>
          )}
        </div>
      )}
    />
  );
};

export const ControlledSelect = memo(ControlledSelectComponent);
