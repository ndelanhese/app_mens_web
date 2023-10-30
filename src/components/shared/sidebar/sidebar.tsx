'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/shadcn/button';
import { getFirstName } from '@/utils/helpers/stringManipulation';
import { useSidebarDrawer } from '@/hooks/useSidebarDrawer/useSidebarDrawer';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/shadcn/accordion';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/ui/shadcn/avatar';
import { Animation } from '@components/shared/animation/animation';

import {
  LogOut,
  X,
  ClipboardList,
  Container,
  Library,
  Newspaper,
  PackageOpen,
  Percent,
  PersonStanding,
  ScrollText,
  ShoppingCart,
  Tags,
  Users,
  WalletCards,
} from 'lucide-react';
import { SidebarLink } from './sidebarLink';
import { parseCookies } from 'nookies';
import { AnimatePresence } from 'framer-motion';

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

  return (
    <AnimatePresence>
      {open && (
        <Animation variant={isMobile ? 'fadeIn' : 'slideRight'}>
          <aside className="absolute z-10 h-[100svh] w-screen border-r border-black-10 bg-white-100 p-5 dark:border-white-10 dark:bg-zinc-950 sm:relative sm:w-56">
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-4 pt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src="https://source.unsplash.com/random/24x24"
                      alt="@ndelanhese"
                    />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="text-md font-re dark:text-white-100">
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
                  <nav
                    className="rounded-lg p-4 font-medium hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    onClick={() => isMobile && handleToggleSidebar()}
                  >
                    Dashboard
                  </nav>
                </Link>
                <Accordion type="multiple">
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
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Financeiro</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex w-full flex-col gap-2">
                        <SidebarLink
                          href="/financial/summaries"
                          title="Relatórios financeiros"
                          icon={ClipboardList}
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
              <Link
                href="/api/auth/signout"
                passHref
                prefetch={false}
                shallow={true}
              >
                <Button
                  variant="destructive"
                  className="w-full bg-opacity-80 text-md dark:bg-opacity-40"
                >
                  <LogOut className="mr-2 h-5 w-5" /> Sair
                </Button>
              </Link>
            </div>
          </aside>
        </Animation>
      )}
    </AnimatePresence>
  );
};
