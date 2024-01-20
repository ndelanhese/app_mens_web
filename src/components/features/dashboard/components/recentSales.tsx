import { Avatar, AvatarFallback } from '@components/ui/shadcn/avatar';
import { getInitialsFromName } from '@utils/helpers/stringManipulation';

import { Sale } from './tabs/api/api.types';

export const RecentSales = ({ data }: { data: Sale[] }) => (
  <div className="space-y-8">
    {data.map((sale, index) => {
      const productsList = sale?.products
        ?.map(product => product?.name)
        .join(', ');
      return (
        <div className="flex items-center" key={`sale-${index}`}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {getInitialsFromName(sale.customer.name)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.customer.name}
            </p>
            <p className="text-muted-foreground text-sm">
              {productsList
                ? productsList.length > 25
                  ? `${productsList.substring(0, 25)}...`
                  : productsList
                : ''}
            </p>
          </div>
          <div className="ml-auto font-medium">
            +
            {sale.final_value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>
      );
    })}
  </div>
);
