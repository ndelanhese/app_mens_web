import { ElementType } from 'react'

export type CommandKeyItemProps = {
  icon: ElementType
  route: string
  title: string
}

export type CommandKeyProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
