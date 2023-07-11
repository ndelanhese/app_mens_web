import React, { FC, InputHTMLAttributes } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'rounded-2xl font-re inline-flex items-center justify-between transition-colors h-14 px-5 py-4 border border-black-10 self-stretch text-black-100 placeholder:text-black-20 text-lg data-[invalid=true]:border-red-500 focus:border-black-40 focus:outline-none dark:border-white-10 dark:focus:border-white-40 dark:text-white-100',
  variants: {
    hasLabel: {
      true: 'border-none w-full px-0 py-0',
    },
  },
})

export interface InputVariants
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}

export const Input: FC<InputVariants> = ({ className, ...props }) => {
  return <input className={input({ className })} {...props} />
}
