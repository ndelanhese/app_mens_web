import { ReactNode } from 'react';

const SigninLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-primary-light p-4 dark:bg-zinc-950">
      <div className="flex h-screen w-full items-center justify-center rounded-2xl bg-white-100 dark:bg-zinc-900/80 sm:h-[40.75rem] sm:w-[42.5rem]">
        {children}
      </div>
    </main>
  );
};
export default SigninLayout;
