import { Controller } from 'react-hook-form';
import { Combobox } from './select';
import { SelectProps } from './controlledSelect.types';
import { twMerge } from 'tailwind-merge';

export const ControlledSelect = ({
  name,
  label,
  options,
  placeHolder,
  searchLabel,
  emptyLabel,
  defaultValue,
  className,
  errorMessage,
  control,
}: SelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field: { onChange, value } }) => (
        <div className={twMerge('flex flex-col transition-colors', className)}>
          <label className="mb-2 text-black-40 dark:text-white-80">
            {label}
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
