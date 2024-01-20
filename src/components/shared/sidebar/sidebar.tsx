'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/shadcn/accordion';
import { Avatar, AvatarImage } from '@components/ui/shadcn/avatar';
import { Button } from '@components/ui/shadcn/button';
import { useSidebarDrawer } from '@hooks/useSidebarDrawer/useSidebarDrawer';
import { getFirstName } from '@utils/helpers/stringManipulation';
import {
  Contact,
  Container,
  Library,
  LogOut,
  Newspaper,
  PackageOpen,
  Percent,
  PersonStanding,
  ScrollText,
  ShoppingCart,
  Tags,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { use, useEffect, useState } from 'react';

import { SidebarLink } from './sidebarLink';

export const Sidebar = () => {
  const { open, handleToggleSidebar } = useSidebarDrawer();

  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const { user } = parseCookies();
    const name = getFirstName(JSON?.parse(user)?.name);
    setUserName(name);
    const isMobileWidth = window.innerWidth < 768;
    setIsMobile(isMobileWidth);
  }, []);

  const CHILDREN = (
    <>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 px-4 pt-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://source.unsplash.com/random/24x24"
                alt="@ndelanhese"
              />
            </Avatar>
            <span className="text-lg font-re dark:text-white-100">
              {userName}
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-white-100 dark:bg-zinc-950 sm:hidden"
            onClick={() => isMobile && handleToggleSidebar()}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="overflow-y-auto sm:mt-6 sm:h-[calc(100vh-13rem)] ">
          <Link href="/" passHref>
            <button
              type="button"
              className="w-full rounded p-4 text-start font-medium hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              onClick={() => isMobile && handleToggleSidebar()}
            >
              Dashboard
            </button>
          </Link>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Administração</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink
                    href="/administration/users"
                    title="Usuários"
                    icon={Users}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                  <SidebarLink
                    href="/administration/roles-permissions"
                    title="Papéis e Permissões"
                    icon={ScrollText}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Gestão de Dados</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink
                    href="/data-management/brands"
                    title="Marcas"
                    icon={Tags}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                  <SidebarLink
                    href="/data-management/categories"
                    title="Categorias"
                    icon={Library}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                  <SidebarLink
                    href="/data-management/products"
                    title="Produtos"
                    icon={PackageOpen}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Clientes</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink
                    href="/customers/customers"
                    title="Clientes"
                    icon={Contact}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                  <SidebarLink
                    href="/customers/orders"
                    title="Pedidos"
                    icon={Newspaper}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                  <SidebarLink
                    href="/customers/sales"
                    title="Vendas"
                    icon={ShoppingCart}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Colaboradores</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink
                    href="/employees/employees"
                    title="Funcionários"
                    icon={PersonStanding}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                  <SidebarLink
                    href="/employees/suppliers"
                    title="Fornecedores"
                    icon={Container}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Promoções</AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col gap-2">
                  <SidebarLink
                    href="/promotions/promotion-categories"
                    title="Categorias"
                    icon={WalletCards}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                  <SidebarLink
                    href="/promotions/promotions"
                    title="Promoções"
                    icon={Percent}
                    onClick={() => isMobile && handleToggleSidebar()}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Link href="/api/auth/signout" passHref prefetch={false} shallow={true}>
          <Button
            variant="destructive"
            className="w-full bg-opacity-80 text-md dark:bg-opacity-40"
          >
            <LogOut className="mr-2 h-5 w-5" /> Sair
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <aside
      data-open={open}
      className={
        'absolute z-20 h-[100dvh] w-screen transform-gpu border-r border-black-10 bg-white-100 px-4 py-3 ease-in-out data-[open=false]:hidden dark:border-white-10 dark:bg-zinc-950 sm:relative sm:w-56'
      }
    >
      {CHILDREN}
    </aside>
  );
};
