import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'rounded-lg font-re inline-flex items-center justify-center',
  variants: {
    color: {
      primary: 'bg-black-100 text-white-100',
      outline: 'bg-white-100 text-black-100 border border-black-100/40',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg',
    },
    fontSize: {
      '2xl': 'text-2xl',
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    fontSize: 'md',
  },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode
}

export const Button = (props: ButtonProps) => {
  return <button className={button(props)}>{props.children}</button>
}
