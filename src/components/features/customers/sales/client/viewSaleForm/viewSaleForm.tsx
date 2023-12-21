'use client';

import { memo } from 'react';

import { DataTable } from '@components/shared/dataTable';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { TableCell, TableRow } from '@components/ui/shadcn/table';

import { nanoid } from 'nanoid';
import { SaleFormProps } from './viewSaleForm.types';

const ViewSaleFormComponent = ({ sale }: SaleFormProps) => {
  const columns = ['Código', 'Nome', 'Part Number', 'Quantidade'];

  const products = sale?.products.map(product => (
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
        value={`${sale?.customer.name} - ${sale?.customer.cpf}`}
      />

      <ControlledInput
        id="description"
        label="Descrição"
        readOnly
        value={sale?.description}
      />

      <ControlledInput
        id="observation"
        label="Observação"
        readOnly
        value={sale?.observation}
      />

      <ControlledInput
        id="date"
        label="Data do pedido"
        readOnly
        value={sale?.date}
      />

      <ControlledInput
        id="status"
        label="Status"
        name="status"
        readOnly
        value={sale?.status}
      />

      <ControlledInput
        id="employee"
        label="Funcionário"
        name="user"
        readOnly
        value={`${sale?.employee.name} - ${sale?.employee.cpf}`}
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

export const ViewSaleForm = memo(ViewSaleFormComponent);
