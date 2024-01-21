'use client';

import { FC, InputHTMLAttributes } from 'react';
import { Control, Controller, FieldValue, FieldValues } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

const controlledInput = tv({
  base: 'flex flex-col transition-colors',
});

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof controlledInput> {
  id: string;
  label?: string;
  control?: Control<FieldValue<FieldValues>>;
  errorMessage?: string;
  isRequired?: boolean;
  mask?: string;
  defaultValue?: string;
  maskType?: 'currency' | string;
}

export const MaskedInput: FC<InputVariants> = ({
  id,
  label,
  className,
  control,
  errorMessage,
  isRequired = false,
  defaultValue,
  mask,
  ...props
}) => {
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field: { onChange, value } }) => (
        <div className={controlledInput()}>
          {label && (
            <label className="mb-2 text-zinc-900 dark:text-white-80">
              {label}
              {isRequired && <span className="text-red-700"> *</span>}
            </label>
          )}
          <InputMask
            {...props}
            id={id}
            value={value}
            onChange={onChange}
            mask={mask ?? ''}
            maskPlaceholder={null}
            maskChar={null}
            className={twMerge(
              'inline-flex h-full items-center justify-between self-stretch rounded border border-black-10 px-4 py-3 font-re text-black-100 transition-colors placeholder:text-md placeholder:font-light placeholder:text-black-20 focus:border-black-40 focus:outline-none disabled:cursor-not-allowed data-[invalid=true]:border-red-500 dark:border-white-10 dark:bg-zinc-950 dark:text-white-100 dark:placeholder:text-white-20 dark:focus:border-white-40',
              className,
            )}
          />
          {errorMessage && (
            <span className="text-sm text-red-600">{errorMessage}</span>
          )}
        </div>
      )}
    />
  );
};
