import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'rounded-2xl font-re inline-flex items-center justify-between transition-colors w-[12.5rem] h-14 px-5 py-4 border border-black-10 self-stretch text-black-100 placeholder:text-black-20 text-lg data-[invalid=true]:border-red-500 focus:border-black-40 focus:outline-none',
  variants: {
    label: {
      true: 'border-none',
    },
  },
  compoundVariants: [],
  defaultVariants: {},
})

type InputVariants = VariantProps<typeof input>

type InputProps = InputVariants

export const Input = (props: InputProps) => {
  return <input className={input(props)} />
}
