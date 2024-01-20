import { Header } from '@components/shared/header/header';
import { Sidebar } from '@components/shared/sidebar/sidebar';
import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-screen flex-col overflow-x-hidden ">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col gap-4 ">
          <Header />
          <section className="flex h-full w-full overflow-y-auto px-5">
            <div className="h-full w-screen overflow-x-auto overflow-y-auto pr-12 sm:h-[calc(100vh-5.5rem)] sm:w-full sm:overflow-y-hidden sm:pr-0">
              {children}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default RootLayout;
