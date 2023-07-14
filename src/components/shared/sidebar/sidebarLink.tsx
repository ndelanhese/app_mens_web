import Link from 'next/link'

import { Button } from '@components/ui/shadcn/button'

import { SidebarLinkProps } from './sidebarLink.types'
import { Icon } from '@radix-ui/react-select'

export const SidebarLink = ({ title, href, icon }: SidebarLinkProps) => (
  <Link href={href} passHref referrerPolicy="same-origin">
    <Button className="w-full justify-start" variant="ghost">
      {icon && <Icon className="mr-2 h-4 w-4" />}
      {title}
    </Button>
  </Link>
)
