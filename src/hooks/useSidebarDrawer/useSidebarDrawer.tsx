'use client';

import { SidebarDrawerContext } from '@contexts/sidebarDrawer/sidebarDrawer.context';
import { useContext } from 'react';

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
