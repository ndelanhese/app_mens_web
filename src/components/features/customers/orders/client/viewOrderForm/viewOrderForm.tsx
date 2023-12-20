'use client';

import { memo } from 'react';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { OrderFormProps } from './viewOrderForm.types';

const ViewOrderFormComponent = ({ order }: OrderFormProps) => {
  return (
    <FormGrid>
      <ControlledInput
        id="description"
        label="Descrição"
        placeholder="Ex. Pedido de calças para..."
        defaultValue={order?.description}
      />
    </FormGrid>
  );
};

export const ViewOrderForm = memo(ViewOrderFormComponent);
