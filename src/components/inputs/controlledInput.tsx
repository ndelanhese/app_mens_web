import { tv, type VariantProps } from 'tailwind-variants'
import { Input } from './input'

const controlledInput = tv({
  base: 'rounded-2xl font-re flex-col inline-flex items-start justify-start transition-colors w-[12.5rem] h-[5.5rem] px-5 py-4 border border-black-10 self-stretch text-black-100 placeholder:text-black-20 text-lg data-[invalid=true]:border-red-500 focus:border-black-40 focus:outline-none',
})

type InputVariants = VariantProps<typeof controlledInput>

interface InputProps extends InputVariants {
  label: string
}

export const ControlledInput = (props: InputProps) => {
  return (
    <div className={controlledInput(props)}>
      <label className="text-lg text-black-40">{props.label}</label>
      <Input hasLabel />
    </div>
  )
}
