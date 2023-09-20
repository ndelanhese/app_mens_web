import { FC, InputHTMLAttributes } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';
import { Input } from './input';

const controlledInput = tv({
  base: 'flex flex-col transition-colors',
});

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof controlledInput> {
  id: string;
  label: string;
  register?: any;
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
      <label className="mb-2 text-black-40 dark:text-white-80">
        {label}
        {isRequired && <span className="text-red-700"> *</span>}
      </label>
      <Input
        id={id}
        {...props}
        register={register}
        errorMessage={errorMessage}
      />
    </div>
  );
};
