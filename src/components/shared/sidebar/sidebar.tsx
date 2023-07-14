'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/shadcn/button'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/shadcn/accordion'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/ui/shadcn/avatar'

import { LogOut, SidebarOpen, X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { SidebarLink } from './sidebarLink'

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return isSidebarOpen ? (
    <aside
      className={twMerge(
        'absolute z-10 h-screen w-screen border-r border-black-10 bg-white-100 px-4 py-5 dark:border-white-10 dark:bg-black-100 sm:relative sm:w-48',
        isSidebarOpen ? 'block' : 'hidden',
      )}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src="https://github.com/ndelanhese.png"
                alt="@ndelanhese"
              />
              <AvatarFallback>ND</AvatarFallback>
            </Avatar>
            <span className="text-md font-re dark:text-white-100">Nathan</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-white-100 dark:bg-black-100 sm:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="overflow-y-scroll sm:mt-6 sm:h-[calc(100vh-13rem)]">
          <Link href="/" passHref>
            <nav className="border-b pb-4 font-medium hover:underline ">
              Dashboard
            </nav>
          </Link>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Administração</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink href="/users" title="Usuários" />
                  <SidebarLink
                    href="/roles-permissions"
                    title="Papéis e Permissões"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Gestão de Dados</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink href="/brands" title="Marcas" />
                  <SidebarLink href="/categories" title="Categorias" />
                  <SidebarLink href="/products" title="Produtos" />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Clientes</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink href="/orders" title="Pedidos" />
                  <SidebarLink href="/sales" title="Vendas" />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Colaboradores</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink href="/employees" title="Funcionários" />
                  <SidebarLink href="/suppliers" title="Fornecedores" />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Financeiro</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink
                    href="/summaries"
                    title="Relatórios financeiros"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Promoções</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink
                    href="/promotions-categories"
                    title="Categorias"
                  />
                  <SidebarLink href="/promotions" title="Promoções" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Link href="api/auth/signout" passHref prefetch={false} shallow={true}>
          <Button variant="destructive" className="w-full text-md">
            <LogOut className="mr-2 h-5 w-5" /> Sair
          </Button>
        </Link>
      </div>
    </aside>
  ) : (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-4 top-3 flex bg-white-100 dark:bg-black-100 sm:hidden"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <SidebarOpen className="h-5 w-5" />
    </Button>
  )
}
