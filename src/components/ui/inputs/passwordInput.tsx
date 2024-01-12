'use client';

import { FC, InputHTMLAttributes, useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { FieldValue, FieldValues, UseFormRegister } from 'react-hook-form';
import { tv, type VariantProps } from 'tailwind-variants';
import { Input } from './input';

const passwordInput = tv({
  base: 'flex flex-col transition-colors relative',
});

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof passwordInput> {
  id: string;
  label?: string;
  register?: UseFormRegister<FieldValue<FieldValues>>;
  errorMessage?: string;
  isRequired?: boolean;
}

export const PasswordInput: FC<InputVariants> = ({
  id,
  label,
  className,
  register,
  errorMessage,
  isRequired = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={passwordInput({ className })}>
      {label && (
        <label className="mb-2 text-zinc-900 dark:text-white-80">
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
          type={isVisible ? 'text' : 'password'}
          className="pr-14"
        />

        <button
          type="button"
          className="absolute right-6 top-4"
          onClick={() => {
            setIsVisible(prev => !prev);
          }}
        >
          {isVisible ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};
