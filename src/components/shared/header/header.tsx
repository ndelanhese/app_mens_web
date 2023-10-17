import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { CommandKeySearchBar } from '../commandKey/commandKeySearchBar';
import { SidebarToggle } from '../sidebarToggle/sidebarToggle';
import { ToggleTheme } from '../toggleTheme/toggleTheme';

export const Header = () => (
  <nav className="flex h-16 w-full items-center justify-between border-b border-black-10 px-7 py-5 dark:border-white-10">
    <div className="flex items-center justify-center gap-4">
      <SidebarToggle />
      <Breadcrumb />
    </div>
    <div className="inline-flex items-center space-x-4">
      <CommandKeySearchBar />
      <ToggleTheme />
    </div>
  </nav>
);
