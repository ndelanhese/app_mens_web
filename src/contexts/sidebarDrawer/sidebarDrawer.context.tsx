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
import { parseCookies, setCookie } from 'nookies';

export const SidebarDrawerContext = createContext<SidebarDrawerContextData>(
  {} as SidebarDrawerContextData,
);

export const SidebarDrawerProvider = ({
  children,
}: SidebarDrawerProviderProps) => {
  const { 'mens.sidebar_status': sidebarStatus } = parseCookies();

  const sidebarIsOpenOnCookies = useMemo(
    () => sidebarStatus !== 'false',
    [sidebarStatus],
  );

  const [open, setOpen] = useState<boolean>(sidebarIsOpenOnCookies ?? true);

  const handleToggleSidebar = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useEffect(() => {
    const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;
    setCookie(undefined, 'mens.sidebar_status', String(open), {
      maxAge: THIRTY_DAYS_IN_SECONDS,
      path: '/',
    });
  }, [open]);

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
