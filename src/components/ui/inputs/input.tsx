import { FC, InputHTMLAttributes } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';

const input = tv({
  base: 'rounded-lg font-re inline-flex items-center justify-between transition-colors px-4 py-2 border border-black-10 self-stretch text-black-100 placeholder:text-black-20 dark:placeholder:text-white-20 data-[invalid=true]:border-red-500 focus:border-black-40 focus:outline-none dark:border-white-10 dark:focus:border-white-40 dark:text-white-100 dark:bg-zinc-950 placeholder:text-md placeholder:font-light',
  variants: {
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
  },
  defaultVariants: {
    transform: 'none',
    hasLabel: false,
  },
});

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  id: string;
  register?: any;
  errorMessage?: string;
}

export const Input: FC<InputVariants> = ({
  id,
  register,
  errorMessage,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        className={input({ className })}
        {...props}
        {...(register ? register(id) : {})}
      />
      {errorMessage && (
        <span className="text-sm text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};
