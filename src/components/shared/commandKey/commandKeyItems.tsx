import {
  CommandGroup,
  CommandSeparator,
} from '@components/ui/shadcn/command/command';

import {
  Contact,
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
import { CommandKeyItem } from './commandKeyItem';
import { CommandKeyItemsProps } from './commandKey.types';

export const CommandKeyItems = ({ setOpen }: CommandKeyItemsProps) => (
  <>
    <CommandGroup heading="Administração">
      <CommandKeyItem
        setOpen={setOpen}
        icon={Users}
        title="Usuários"
        route="/administration/users"
      />
      <CommandKeyItem
        setOpen={setOpen}
        icon={ScrollText}
        title="Papéis e Permissões"
        route="/administration/roles-permissions"
      />
    </CommandGroup>

    <CommandSeparator />

    <CommandGroup heading="Gestão de Dados">
      <CommandKeyItem
        setOpen={setOpen}
        icon={Tags}
        title="Marcas"
        route="/data-management/brands"
      />
      <CommandKeyItem
        setOpen={setOpen}
        icon={Library}
        title="Categorias"
        route="/data-management/categories"
      />
      <CommandKeyItem
        setOpen={setOpen}
        icon={PackageOpen}
        title="Produtos"
        route="/data-management/products"
      />
    </CommandGroup>

    <CommandSeparator />

    <CommandGroup heading="Clientes">
      <CommandKeyItem
        setOpen={setOpen}
        icon={Contact}
        title="Clientes"
        route="/customers/customers"
      />
      <CommandKeyItem
        setOpen={setOpen}
        icon={Newspaper}
        title="Pedidos"
        route="/customers/orders"
      />
      <CommandKeyItem
        setOpen={setOpen}
        icon={ShoppingCart}
        title="Vendas"
        route="/customers/sales"
      />
    </CommandGroup>

    <CommandSeparator />

    <CommandGroup heading="Clientes">
      <CommandKeyItem
        setOpen={setOpen}
        icon={PersonStanding}
        title="Funcionários"
        route="/employees/employees"
      />
      <CommandKeyItem
        setOpen={setOpen}
        icon={Container}
        title="Fornecedores"
        route="/employees/suppliers"
      />
    </CommandGroup>

    <CommandSeparator />

    <CommandGroup heading="Promoções">
      <CommandKeyItem
        setOpen={setOpen}
        icon={WalletCards}
        title="Categoria de promoções"
        route="/promotions/promotion-categories"
      />
      <CommandKeyItem
        setOpen={setOpen}
        icon={Percent}
        title="Promoções"
        route="/promotions/promotions"
      />
    </CommandGroup>
  </>
);
