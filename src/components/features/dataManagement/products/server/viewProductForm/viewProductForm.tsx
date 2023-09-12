import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { ProductPreviewProps } from './viewProductForm.types';

export const ViewProductForm = ({ product }: ProductPreviewProps) => {
  return (
    <div className="flex w-full flex-col gap-4 overflow-y-auto sm:max-h-[30rem]">
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
        value={product?.price}
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
    </div>
  );
};
