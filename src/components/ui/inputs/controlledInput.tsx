'use client';

import { ComponentType, FC, InputHTMLAttributes, ReactNode } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';
import { Input } from './input';
import { FieldValue, FieldValues, UseFormRegister } from 'react-hook-form';

const controlledInput = tv({
  base: 'flex flex-col transition-colors',
});

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof controlledInput> {
  id: string;
  label?: string;
  register?: UseFormRegister<FieldValue<FieldValues>>;
  errorMessage?: string;
  isRequired?: boolean;
}

export const ControlledInput: FC<InputVariants> = ({
  id,
  label,
  className,
  register,
  errorMessage,
  isRequired = false,
  ...props
}) => {
  return (
    <div className={controlledInput({ className })}>
      {label && (
        <label className="mb-2 text-black-80 dark:text-white-80">
          {label}
          {isRequired && <span className="text-red-700"> *</span>}
        </label>
      )}
      <div className="relative flex w-full flex-row items-center">
        <Input
          id={id}
          {...props}
          register={register}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};
