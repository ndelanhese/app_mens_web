'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/shadcn/button'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/ui/shadcn/avatar'

import { twMerge } from 'tailwind-merge'
import { SidebarOpen, X } from 'lucide-react'

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return isSidebarOpen ? (
    <aside
      className={twMerge(
        'absolute z-10 h-screen w-screen border-r border-black-10 bg-white-100 px-4 py-5 dark:border-white-10 dark:bg-black-100 sm:relative sm:w-48 sm:bg-black-100',
        isSidebarOpen ? 'block' : 'hidden',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src="https://github.com/ndelanhese.png"
              alt="@ndelanhese"
            />
            <AvatarFallback>ND</AvatarFallback>
          </Avatar>
          <span className="text-md font-re dark:text-white-100">Nathan</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="bg-white-100 dark:bg-black-100 sm:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <nav className="mt-10 space-y-5">nav link</nav>
    </aside>
  ) : (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-4 top-3 flex bg-white-100 dark:bg-black-100 sm:hidden"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <SidebarOpen className="h-5 w-5" />
    </Button>
  )
}
