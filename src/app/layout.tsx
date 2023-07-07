import { ToastProvider } from '@contexts/toast/toastProvider'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Mens Modas',
    default: 'Mens Modas',
  },
  applicationName: 'Mens Modas referral',
  keywords: [
    'Mens',
    'Mens Modas',
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
      template: '%s | Mens Modas',
      default: 'Mens Modas',
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
        className={`${inter.variable} flex min-h-[100svh] w-screen font-sans antialiased`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
export default RootLayout
