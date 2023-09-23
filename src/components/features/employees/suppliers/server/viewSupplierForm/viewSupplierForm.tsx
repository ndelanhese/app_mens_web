import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { convertStatus } from '@utils/status';

import { SupplierPreviewProps } from './viewSupplierForm.types';

export const ViewSupplierForm = ({ supplier }: SupplierPreviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2">
      <ControlledInput value={supplier?.id} id="id" label="Código" readOnly />
      <ControlledInput
        value={supplier?.corporateName}
        id="name"
        label="Nome"
        readOnly
      />
      <ControlledInput
        value={supplier?.contactName}
        id="cpf"
        label="CPF"
        readOnly
      />
      <ControlledInput value={supplier?.cnpj} id="rg" label="RG" readOnly />

      <ControlledInput
        value={convertStatus(supplier?.status)}
        id="status"
        label="Status"
        readOnly
      />
      {supplier?.addresses?.map(address => (
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
            value={address.postalCode}
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
    </div>
  );
};
