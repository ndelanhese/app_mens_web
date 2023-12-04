import { FormGrid } from '@components/shared/formGrid/formGrid';
import { DataTable } from '@components/shared/dataTable';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { TableRow, TableCell } from '@components/ui/shadcn/table';

import { PromotionPreviewProps } from './viewPromotionForm.types';
import { nanoid } from 'nanoid';

export const ViewPromotionForm = ({ promotion }: PromotionPreviewProps) => {
  // {invoices.map(invoice => (
  //         <TableRow key={invoice.invoice}>
  //           <TableCell className="font-medium">{invoice.invoice}</TableCell>
  //           <TableCell>{invoice.paymentStatus}</TableCell>
  //           <TableCell>{invoice.paymentMethod}</TableCell>
  //           <TableCell className="text-right">{invoice.totalAmount}</TableCell>
  //         </TableRow>
  //       ))}

  const columns = ['Código', 'Nome', 'Part Number', 'Preço', 'Quantidade'];

  const products = promotion?.products.map(product => (
    <TableRow key={nanoid()}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.part_number}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.quantity}</TableCell>
    </TableRow>
  ));

  return (
    <FormGrid>
      <ControlledInput value={promotion?.id} id="id" label="Código" readOnly />
      <ControlledInput
        value={promotion?.name}
        id="name"
        label="Promoção"
        readOnly
      />
      <ControlledInput
        value={promotion?.description}
        id="description"
        label="Descrição"
        readOnly
      />
      <ControlledInput
        value={promotion?.initialDate}
        id="initial_date"
        label="Data inicial"
        readOnly
      />
      <ControlledInput
        value={promotion?.finalDate}
        id="final_date"
        label="Data final"
        readOnly
      />
      <ControlledInput
        value={promotion?.status}
        id="status"
        label="Status"
        readOnly
      />
      <ControlledInput
        value={promotion?.discount}
        id="discount"
        label="Desconto"
        readOnly
      />
      <ControlledInput
        value={promotion?.category}
        id="category"
        label="Categoria"
        readOnly
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
