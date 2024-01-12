import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { CustomerPreviewProps } from './viewCustomerForm.types';

export const ViewCustomerForm = ({ customer }: CustomerPreviewProps) => {
  return (
    <FormGrid>
      <ControlledInput value={customer?.id} id="id" label="Código" readOnly />
      <ControlledInput value={customer?.name} id="name" label="Nome" readOnly />
      <ControlledInput value={customer?.cpf} id="cpf" label="CPF" readOnly />
      {customer?.rg && (
        <ControlledInput value={customer?.rg} id="rg" label="RG" readOnly />
      )}
      <ControlledInput
        value={customer?.birth_date}
        id="birthDate"
        label="Data de nascimento"
        readOnly
      />
      <ControlledInput
        value={customer?.phone}
        id="phone"
        label="Celular"
        readOnly
      />
      {customer?.addresses?.map(address => (
        <>
          <ControlledInput
            value={address.address}
            id="address.address"
            label="Endereço"
            readOnly
          />
          <ControlledInput
            value={address.number}
            id="address.number"
            label="Número"
            readOnly
          />
          <ControlledInput
            value={address.district}
            id="address.district"
            label="Bairro"
            readOnly
          />
          <ControlledInput
            value={address.postal_code}
            id="address.postal_code"
            label="CEP"
            readOnly
          />
          <ControlledInput
            value={address.state}
            id="address.state"
            label="Estado"
            readOnly
          />
          <ControlledInput
            value={address.city}
            id="address.city"
            label="Cidade"
            readOnly
          />
        </>
      ))}
    </FormGrid>
  );
};
