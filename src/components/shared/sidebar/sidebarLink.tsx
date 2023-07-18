import Link from 'next/link'

import { Button } from '@components/ui/shadcn/button'

import { SidebarLinkProps } from './sidebarLink.types'

export const SidebarLink = ({ title, href, icon: Icon }: SidebarLinkProps) => (
  <Link href={href} passHref referrerPolicy="same-origin">
    <Button className="w-full justify-start" variant="ghost">
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {title}
    </Button>
  </Link>
)
