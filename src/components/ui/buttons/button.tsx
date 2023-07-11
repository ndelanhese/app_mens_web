import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'rounded-lg font-re inline-flex items-center justify-center transition-colors',
  variants: {
    color: {
      primary:
        'bg-black-100 text-white-100 hover:bg-black-80 dark:bg-secondary-purple-B dark:hover:bg-secondary-purple-B/80 dark:text-black-100',
      outline:
        'bg-white-100 text-black-100 border border-black-20 hover:border-black-100',
      opaque: 'bg-black-5 text-black-100 hover:bg-black-10',
      white: 'bg-white-100 text-black-100 hover:bg-black-5',
    },
    size: {
      sm: 'text-md px-2 py-1 gap-1',
      md: 'text-lg px-4 py-2 gap-2',
      lg: 'text-lg px-6 py-4 gap-2 rounded-2xl font-sb',
    },
    disabled: {
      true: 'bg-opacity-5 text-opacity-10 cursor-not-allowed text-black-100',
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
})

export interface ButtonVariants
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: ReactNode
  color?: 'primary' | 'outline' | 'opaque' | 'white'
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
  )
}
