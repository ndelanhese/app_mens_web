import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-primary-light dark:bg-black-100">
      <div className="flex h-[40.75rem] w-[42.5rem] items-center justify-center rounded-2xl bg-white-100 dark:bg-white-5">
        {children}
        <footer className="absolute bottom-12 text-sm">
          Feito por{' '}
          <a
            href="https://github.com/ndelanhese"
            target="_blank"
            rel="noreferrer"
          >
            Nathan Delanhese
          </a>
        </footer>
      </div>
    </main>
  )
}
export default RootLayout
