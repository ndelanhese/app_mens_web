import React from 'react'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import { ToastProvider } from '@contexts/toast/toastProvider'
import { Metadata } from 'next'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Consórcio Gazin Representante',
  description: 'Consórcio Gazin Representante, criado por e-Code',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} flex min-h-[100svh] w-screen antialiased`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
export default RootLayout
