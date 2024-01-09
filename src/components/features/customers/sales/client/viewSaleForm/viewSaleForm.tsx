'use client';

import { memo, useMemo } from 'react';

import { DataTable } from '@components/shared/dataTable';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { TableCell, TableRow } from '@components/ui/shadcn/table';

import {
  calculateInstallment,
  formatMoneyByCurrencySymbol,
} from '@utils/helpers';

import { nanoid } from 'nanoid';
import { SaleFormProps } from './viewSaleForm.types';

const ViewSaleFormComponent = ({ sale }: SaleFormProps) => {
  const columns = ['Código', 'Nome', 'Part Number', 'Quantidade'];

  console.log(sale);

  const products = sale?.products.map(product => (
    <TableRow key={nanoid()}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.part_number}</TableCell>

      <TableCell>{product.sold_product_qty} Und.</TableCell>
    </TableRow>
  ));

  const memoizedPayment = useMemo(() => {
    const method = sale?.methods_of_payments[0];
    const payment = calculateInstallment(
      sale?.final_value ?? 0,
      method?.installment,
    );
    return `${payment?.installment}x - ${payment?.amount}`;
  }, [sale?.final_value, sale?.methods_of_payments]);

  return (
    <FormGrid>
      <ControlledInput value={sale?.id} id="id" label="Código" readOnly />

      <ControlledInput
        id="customer"
        label="Cliente"
        name="customer"
        readOnly
        value={`${sale?.customer.name} - ${sale?.customer.cpf}`}
      />

      <ControlledInput
        id="observation"
        label="Observação"
        readOnly
        value={sale?.observation}
      />

      <ControlledInput
        id="date"
        label="Data da venda"
        readOnly
        value={sale?.date}
      />

      <ControlledInput
        id="user"
        label="Funcionário"
        readOnly
        value={`${sale?.employee.name} - ${sale?.employee.cpf}`}
      />

      <ControlledInput
        id="status"
        label="Status"
        name="status"
        readOnly
        value={sale?.status}
      />
      <div className="col-start-1 col-end-3 h-px bg-neutral-600 dark:bg-black-80" />

      <h1 className="text-black-80 dark:text-white-80 ">Produtos</h1>
      <div className="col-start-1 col-end-3">
        <DataTable
          columns={columns}
          emptyMessage="Nenhum produto para essa promoção."
        >
          {products}
        </DataTable>
      </div>

      {sale?.discount_amount && sale.discount_type && (
        <ControlledInput
          value={
            sale?.discount_type === 'fixed'
              ? formatMoneyByCurrencySymbol(sale?.discount_amount)
              : `${sale?.discount_amount}%`
          }
          id="discount"
          label="Desconto"
          readOnly
        />
      )}

      <ControlledInput
        id="total_value"
        label="Valor total"
        readOnly
        value={formatMoneyByCurrencySymbol(sale?.total_value)}
      />

      <ControlledInput
        id="final_value"
        label="Valor final"
        readOnly
        value={sale?.formatted_final_value}
      />

      <ControlledInput
        id="payment"
        label="Pagamento"
        readOnly
        value={memoizedPayment}
      />
    </FormGrid>
  );
};

export const ViewSaleForm = memo(ViewSaleFormComponent);
