import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'rounded-lg font-re inline-flex items-center justify-center transition-colors',
  variants: {
    color: {
      primary:
        'bg-zinc-950 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:hover:bg-zinc-50/90 dark:text-zinc-950',
      outline:
        'bg-zinc-50 text-zinc-950 border border-black-20 hover:border-zinc-950',
      opaque: 'bg-black-5 text-zinc-950 hover:bg-black-10',
      white: 'bg-zinc-50 text-zinc-950 hover:bg-black-5',
    },
    size: {
      sm: 'text-md px-2 py-1 gap-1',
      md: 'px-4 py-3 gap-2',
      lg: 'px-6 py-3 gap-2 rounded-lg font-sb',
    },
    disabled: {
      true: 'bg-opacity-5 text-opacity-10 cursor-not-allowed text-zinc-950',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      disabled: true,
      className: 'hover:bg-black-5',
    },
    {
      color: 'outline',
      disabled: true,
      className: 'hover:bg-white-5 hover:border-black-20',
    },
    {
      color: 'opaque',
      disabled: true,
      className: 'hover:bg-black-5',
    },
    {
      color: 'white',
      disabled: true,
      className: 'hover:bg-white-5',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
    disabled: false,
  },
});

export interface ButtonVariants
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: ReactNode;
  color?: 'primary' | 'outline' | 'opaque' | 'white';
}

export const Button: FC<ButtonVariants> = ({
  className,
  color,
  size,
  disabled,
  children,
  ...props
}) => {
  return (
    <button className={button({ className, color, size, disabled })} {...props}>
      {children}
    </button>
  );
};
