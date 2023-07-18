'use client'

import { useState } from 'react'

import { Input } from '@components/ui/shadcn/input'

import { CommandKey } from './commandKey'
import { Search } from 'lucide-react'

export const CommandKeySearchBar = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative flex items-center">
      <div className="absolute left-2 flex flex-row items-center gap-1">
        <Search className="h-4 w-4" />
      </div>
      <Input
        className="border border-black-10 bg-white-100 pl-8 pr-11 dark:border-white-10 dark:bg-black-100"
        placeholder="Pesquisar..."
        onClick={() => setOpen(true)}
      />
      <div className="absolute right-2 flex flex-row items-center gap-1">
        <CommandKey open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}
