'use client';

import { Button } from '@components/ui/shadcn/button';
import { useSidebarDrawer } from '@hooks/useSidebarDrawer/useSidebarDrawer';
import { SidebarClose, SidebarOpen } from 'lucide-react';

export const SidebarToggle = () => {
  const { handleToggleSidebar, open } = useSidebarDrawer();

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-white-100 dark:bg-zinc-950"
      onClick={handleToggleSidebar}
    >
      {!open ? (
        <SidebarOpen className="h-5 w-5" />
      ) : (
        <SidebarClose className="h-5 w-5" />
      )}
    </Button>
  );
};
