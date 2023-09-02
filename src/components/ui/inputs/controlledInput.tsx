import { FC, InputHTMLAttributes } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';
import { Input } from './input';

const controlledInput = tv({
  base: 'rounded-2xl font-re flex-col inline-flex items-start justify-start transition-colors w-72 self-stretch text-black-100 placeholder:text-black-20 text-lg data-[invalid=true]:border-red-500 focus:border-black-40 focus:outline-none',
});

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof controlledInput> {
  id: string;
  label: string;
}

export const ControlledInput: FC<InputVariants> = ({
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div className={controlledInput({ className })}>
      <label className="mb-2 text-lg text-black-40 dark:text-white-80">
        {label}
      </label>
      <Input id={id} hasLabel {...props} />
    </div>
  );
};
