'use client';

import { useContext } from 'react';

import { SidebarDrawerContext } from '@contexts/sidebarDrawer/sidebarDrawer.context';

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
