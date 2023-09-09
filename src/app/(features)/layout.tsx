import { ReactNode, Suspense } from 'react';

import { Breadcrumb } from '@components/shared/breadcrumb/breadcrumb';
import { CommandKeySearchBar } from '@components/shared/commandKey/commandKeySearchBar';
import { Sidebar } from '@components/shared/sidebar/sidebar';
import { ToggleTheme } from '@components/shared/toggleTheme/toggleTheme';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col gap-4">
          <nav className="flex h-16 w-full items-center justify-end border-b border-black-10 px-7 py-5 pr-20 dark:border-white-10 sm:justify-between sm:pr-7">
            <Breadcrumb />
            <div className="inline-flex items-center space-x-4">
              <CommandKeySearchBar />
              <ToggleTheme />
            </div>
          </nav>
          <section className="flex h-full w-full overflow-y-auto px-5">
            <div className="h-[calc(100vh-5.5rem)] w-screen overflow-x-auto pr-12 sm:w-[calc(100vw-16.5rem)] sm:overflow-y-hidden sm:pr-0">
              {children}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default RootLayout;
