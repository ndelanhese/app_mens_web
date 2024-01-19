import { DataTable } from '@components/shared/dataTable';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { TableCell, TableRow } from '@components/ui/shadcn/table';
import { formatMoneyByCurrencySymbol } from '@utils/helpers';
import { nanoid } from 'nanoid';

import { PromotionPreviewProps } from './viewPromotionForm.types';

export const ViewPromotionForm = ({ promotion }: PromotionPreviewProps) => {
  const columns = ['Código', 'Nome', 'Part Number', 'Preço', 'Quantidade'];

  const products = promotion?.products.map(product => (
    <TableRow key={nanoid()}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.part_number}</TableCell>
      <TableCell>{formatMoneyByCurrencySymbol(product.price)}</TableCell>
      <TableCell>{product.quantity} Und.</TableCell>
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
