import { CommandGroup } from '@/components/ui/shadcn/command/command';

import {
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
import { CommandKeyItem } from './commandKeyItem';

export const CommandKeyItems = () => (
  <CommandGroup heading="Funções">
    <CommandKeyItem icon={Users} title="Usuários" route="/users" />
    <CommandKeyItem
      icon={ScrollText}
      title="Papéis e Permissões"
      route="/roles-permissions"
    />
    <CommandKeyItem icon={Tags} title="Marcas" route="/brands" />
    <CommandKeyItem icon={Library} title="Categorias" route="/categories" />
    <CommandKeyItem icon={PackageOpen} title="Produtos" route="/products" />
    <CommandKeyItem icon={Newspaper} title="Pedidos" route="/orders" />
    <CommandKeyItem icon={Newspaper} title="Pedidos" route="/orders" />
    <CommandKeyItem icon={ShoppingCart} title="Vendas" route="/sales" />
    <CommandKeyItem
      icon={PersonStanding}
      title="Funcionários"
      route="/employees"
    />
    <CommandKeyItem icon={Container} title="Fornecedores" route="/suppliers" />
    <CommandKeyItem
      icon={ClipboardList}
      title="Relatórios financeiros"
      route="/summaries"
    />
    <CommandKeyItem
      icon={WalletCards}
      title="Categoria de promoções"
      route="/promotion-categories"
    />
    <CommandKeyItem icon={Percent} title="Promoções" route="/promotions" />
  </CommandGroup>
);
