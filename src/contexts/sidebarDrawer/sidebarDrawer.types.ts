import { ReactNode } from 'react';

export interface SidebarDrawerContextData {
  open: boolean;
  handleToggleSidebar: () => void;
}

export interface SidebarDrawerProviderProps {
  children: ReactNode;
}
