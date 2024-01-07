import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { FormGrid } from '@components/shared/formGrid/formGrid';

import { ProductPreviewProps } from './viewProductForm.types';

export const ViewProductForm = ({ product }: ProductPreviewProps) => {
  return (
    <FormGrid>
      <ControlledInput value={product?.id} id="id" label="Código" readOnly />
      <ControlledInput value={product?.name} id="name" label="Nome" readOnly />
      <ControlledInput
        value={product?.partNumber}
        id="code"
        label="Part Number"
        readOnly
      />
      <ControlledInput
        value={product?.description}
        id="description"
        label="Descrição"
        readOnly
      />
      <ControlledInput
        value={product?.price_formatted}
        id="price"
        label="Preço"
        readOnly
      />
      <ControlledInput
        value={product?.size}
        id="size"
        label="Tamanho"
        readOnly
      />
      <ControlledInput value={product?.color} id="color" label="Cor" readOnly />
      <ControlledInput
        value={product?.quantity}
        id="quantity"
        label="Quantidade"
        readOnly
      />
      <ControlledInput
        value={product?.category.name}
        id="category"
        label="Categoria"
        readOnly
      />
      <ControlledInput
        value={product?.brand.name}
        id="brand"
        label="Marca"
        readOnly
      />
      <ControlledInput
        value={product?.supplier.corporate_name}
        id="supplier"
        label="Fornecedor"
        readOnly
      />
    </FormGrid>
  );
};
