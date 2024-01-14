'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  SidebarDrawerContextData,
  SidebarDrawerProviderProps,
} from './sidebarDrawer.types';

export const SidebarDrawerContext = createContext<SidebarDrawerContextData>(
  {} as SidebarDrawerContextData,
);

export const SidebarDrawerProvider = ({
  children,
}: SidebarDrawerProviderProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleToggleSidebar = useCallback(() => {
    setOpen(open => !open);
  }, []);

  const memoizedSidebarStatus = useMemo(
    () => ({ open, handleToggleSidebar }),
    [open, handleToggleSidebar],
  );
  return (
    <SidebarDrawerContext.Provider value={memoizedSidebarStatus}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};
