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
}

export const ControlledInput: FC<InputVariants> = ({
  id,
  label,
  className,
  register,
  errorMessage,
  ...props
}) => {
  return (
    <div className={controlledInput({ className })}>
      <label className="mb-2 text-black-40 dark:text-white-80">{label}</label>
      <Input
        id={id}
        {...props}
        register={register}
        errorMessage={errorMessage}
      />
    </div>
  );
};
