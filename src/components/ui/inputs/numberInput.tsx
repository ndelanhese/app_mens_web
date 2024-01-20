'use client';

import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import { Control, Controller, FieldValue, FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

import { mask, setMask } from '@/utils/mask';

import { Input } from './input';

const controlledInput = tv({
  base: 'flex flex-col transition-colors',
});

export type Mask =
  | 'cpf'
  | 'cnpj'
  | 'cpfCnpj'
  | 'cell'
  | 'cellAreaCode'
  | 'cep'
  | 'date'
  | 'phone'
  | 'phoneAreaCode'
  | 'percentage'
  | 'money'
  | 'onlyNumbers';

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof controlledInput> {
  id: string;
  label?: string;
  control?: Control<FieldValue<FieldValues>>;
  errorMessage?: string;
  isRequired?: boolean;
  mask?: Mask | string;
  defaultValue?: string;
}

export const NumberInput: FC<InputVariants> = ({
  id,
  label,
  className,
  control,
  errorMessage,
  isRequired = false,
  defaultValue,
  mask: typeMaskInput,
  ...props
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const objMask = Object.keys(mask).find(
      objectName => objectName === typeMaskInput,
    ) as Mask;

    const { currentTarget } = event;
    const inputValue = currentTarget?.value ?? '';

    if (!mask[objMask]) {
      return (currentTarget.value = setMask(
        inputValue,
        typeMaskInput as string,
      ));
    }

    return (currentTarget.value = mask[objMask](inputValue));
  };

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
          <Input
            {...props}
            id={id}
            value={value}
            onChange={event => {
              onChange(handleChange(event));
            }}
            defaultValue={defaultValue}
            type="text"
            className={twMerge(
              'inline-flex items-center justify-between self-stretch rounded border border-black-10 px-4 py-3 font-re text-black-100 transition-colors placeholder:text-md placeholder:font-light placeholder:text-black-20 focus:border-black-40 focus:outline-none disabled:cursor-not-allowed data-[invalid=true]:border-red-500 dark:border-white-10 dark:bg-zinc-950 dark:text-white-100 dark:placeholder:text-white-20 dark:focus:border-white-40',
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
