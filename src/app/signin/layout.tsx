import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-primary-light p-4 dark:bg-black-100">
      <div className="flex h-[35rem] w-full items-center justify-center rounded-2xl bg-white-100 dark:bg-white-5 sm:h-[40.75rem] sm:w-[42.5rem]">
        {children}
      </div>
    </main>
  )
}
export default RootLayout
// FIXME: remove root layout from home
