import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'rounded-lg font-re inline-flex items-center justify-center transition-colors',
  variants: {
    color: {
      primary: 'bg-black-100 text-white-100 hover:bg-black-80',
      outline:
        'bg-white-100 text-black-100 border border-black-20 hover:border-black-100',
      opaque: 'bg-black-5 text-black-100 hover:bg-black-10',
      white: 'bg-white-100 text-black-100 hover:bg-black-5',
    },
    size: {
      sm: 'text-md px-2 py-1',
      md: 'text-lg px-4 py-2',
      lg: 'text-lg px-6 py-4',
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
    size: 'md',
    color: 'primary',
    fontSize: 'md',
    disabled: false,
  },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode
}

export const Button = (props: ButtonProps) => {
  return <button className={button(props)}>{props.children}</button>
}
