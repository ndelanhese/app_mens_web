'use client';

import { memo } from 'react';

import { DataTable } from '@components/shared/dataTable';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { TableCell, TableRow } from '@components/ui/shadcn/table';

import { nanoid } from 'nanoid';
import { OrderFormProps } from './viewOrderForm.types';

const ViewOrderFormComponent = ({ order }: OrderFormProps) => {
  const columns = ['Código', 'Nome', 'Part Number', 'Quantidade'];

  const products = order?.orders_products.map(product => (
    <TableRow key={nanoid()}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.part_number}</TableCell>

      <TableCell>{product.quantity} Und.</TableCell>
    </TableRow>
  ));

  return (
    <FormGrid>
      <ControlledInput
        id="customer"
        label="Cliente"
        name="customer"
        readOnly
        value={`${order?.customer.name} - ${order?.customer.cpf}`}
      />

      <ControlledInput
        id="description"
        label="Descrição"
        readOnly
        value={order?.description}
      />

      <ControlledInput
        id="observation"
        label="Observação"
        readOnly
        value={order?.observation}
      />

      <ControlledInput
        id="date"
        label="Data do pedido"
        readOnly
        value={order?.date}
      />

      <ControlledInput
        id="status"
        label="Status"
        name="status"
        readOnly
        value={order?.status}
      />

      <ControlledInput
        id="employee"
        label="Funcionário"
        name="user"
        readOnly
        value={`${order?.employee.name} - ${order?.employee.cpf}`}
      />
      <h1 className="text-black-80 dark:text-white-80 ">Produtos</h1>
      <div className="col-start-1 col-end-3 h-px bg-neutral-600 dark:bg-black-80" />
      <div className="col-start-1 col-end-3">
        <DataTable
          columns={columns}
          emptyMessage="Nenhum produto para essa promoção."
        >
          {products}
        </DataTable>
      </div>
    </FormGrid>
  );
};

export const ViewOrderForm = memo(ViewOrderFormComponent);
