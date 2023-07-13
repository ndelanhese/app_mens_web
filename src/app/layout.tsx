import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

import { Toaster } from '@components/ui/shadcn/toast/toaster'
import { Sidebar } from '@components/shared/sidebar/sidebar'
import { Input } from '@components/ui/shadcn/input'
import { CommandKey } from '@components/shared/commandKey/commandKey'
import { ToggleTheme } from '@components/shared/toggleTheme/toggleTheme'

import { ThemeProvider } from '@contexts/theme'

import { Search } from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Mens Moda Masculina',
    default: 'Mens Moda Masculina',
  },
  applicationName: 'Mens Moda Masculina',
  keywords: [
    'Mens',
    'Mens Moda Masculina',
    'Moda Masculina',
    'Alto Piquiri',
    'Nathan',
    'Delanhese',
    'Nathan Delanhese',
  ],
  colorScheme: 'dark light',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    title: {
      template: '%s | Mens Moda Masculina',
      default: 'Mens Moda Masculina',
    },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nam minima repellat numquam architecto! Atque officia deleniti tempora sed. Quam est maiores voluptate ad ducimus quo eos minima, rerum ea.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: 'Mens Modas',
      },
    ],
    type: 'website',
  },
}
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} flex min-h-[100svh] w-screen bg-white-100 font-sans antialiased dark:bg-black-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen w-screen flex-col">
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex flex-1 flex-col gap-4">
                <nav className="flex h-16 w-full items-center justify-between border-b border-black-10 px-7 py-5 dark:border-white-10">
                  <div className="invisible w-12 sm:visible sm:w-auto">
                    Dashboard / ...
                  </div>
                  <div className="inline-flex items-center space-x-4">
                    <div className="relative flex items-center">
                      <div className="absolute left-2 flex flex-row items-center gap-1">
                        <Search className="h-4 w-4" />
                      </div>
                      <Input
                        className="border border-white-10 bg-zinc-800 pl-8 pr-11 dark:bg-black-100"
                        placeholder="Pesquisar..."
                      />
                      <div className="absolute right-2 flex flex-row items-center gap-1">
                        <CommandKey />
                      </div>
                    </div>
                    <ToggleTheme />
                  </div>
                </nav>
                <section className="flex h-full w-full overflow-y-auto px-7 py-5">
                  {children}
                </section>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
export default RootLayout
