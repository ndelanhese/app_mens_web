import { FC, InputHTMLAttributes } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';
import { Input } from './input';
import { FieldValue, FieldValues, UseFormRegister } from 'react-hook-form';
import InputMask from 'react-input-mask';

const controlledInput = tv({
  base: 'flex flex-col transition-colors',
});

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof controlledInput> {
  id: string;
  label: string;
  register?: UseFormRegister<FieldValue<FieldValues>>;
  errorMessage?: string;
  isRequired?: boolean;
  mask?: string;
}

export const MaskedInput: FC<InputVariants> = ({
  id,
  label,
  className,
  register,
  errorMessage,
  isRequired = false,
  mask,
  ...props
}) => {
  return (
    <div className={controlledInput({ className })}>
      <label className="mb-2 text-black-40 dark:text-white-80">
        {label}
        {isRequired && <span className="text-red-700"> *</span>}
      </label>
      <InputMask
        {...props}
        id={id}
        {...(register ? register(id) : {})}
        mask={mask ?? ''}
        maskPlaceholder={null}
        maskChar={null}
        className="inline-flex items-center justify-between self-stretch rounded-lg border border-black-10 px-4 py-2 font-re text-black-100 transition-colors placeholder:text-md placeholder:font-light placeholder:text-black-20 focus:border-black-40 focus:outline-none data-[invalid=true]:border-red-500 dark:border-white-10 dark:bg-zinc-950 dark:text-white-100 dark:placeholder:text-white-20 dark:focus:border-white-40"
      />
      {errorMessage && (
        <span className="text-sm text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};
