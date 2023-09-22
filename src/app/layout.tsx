import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

import { Toaster } from '@components/ui/shadcn/toast/toaster';

import { ThemeProvider } from '@contexts/theme';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Mens Moda Masculina',
    default: 'Mens Moda Masculina',
  },
  description:
    'Mens Moda Mascula, loja de vestuária masculina na cidade de Alto Piquiri',
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
};
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} flex min-h-[100svh] w-screen overflow-x-hidden bg-white-100 font-sans antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
