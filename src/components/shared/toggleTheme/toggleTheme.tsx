'use client';

import { useEffect, useState } from 'react';

import { useSidebarDrawer } from '@hooks/useSidebarDrawer/useSidebarDrawer';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/shadcn/dropdownMenu';
import { Button } from '@components/ui/shadcn/button';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ToggleTheme() {
  const { setTheme } = useTheme();
  const { open } = useSidebarDrawer();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileWidth = window.innerWidth < 768;
    setIsMobile(isMobileWidth);
  }, []);

  if (isMobile && open) {
    return undefined;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="border border-black-10 bg-white-100 text-black-100 hover:border-none hover:bg-zinc-400 hover:outline-none dark:border-white-10 dark:bg-zinc-950 dark:text-white-100 dark:hover:bg-zinc-700"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Trocar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
