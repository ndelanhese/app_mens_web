import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { convertStatus } from '@utils/status';
import { convertDateToString } from '@utils/helpers/date';

import { EmployeePreviewProps } from './viewEmployeeForm.types';

export const ViewEmployeeForm = ({ employee }: EmployeePreviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2">
      <ControlledInput value={employee?.id} id="id" label="Código" readOnly />
      <ControlledInput value={employee?.name} id="name" label="Nome" readOnly />
      <ControlledInput value={employee?.cpf} id="cpf" label="CPF" readOnly />
      <ControlledInput value={employee?.rg} id="rg" label="RG" readOnly />
      <ControlledInput
        value={convertDateToString(employee?.birthDate)}
        id="birthDate"
        label="Data de nascimento"
        readOnly
      />
      <ControlledInput
        value={employee?.phone}
        id="phone"
        label="Celular"
        readOnly
      />
      <ControlledInput
        value={employee?.pisPasep}
        id="pisPasep"
        label="PIS/PASEP"
        readOnly
      />
      <ControlledInput
        value={convertDateToString(employee?.admissionDate)}
        id="admissionDate"
        label="Data de admissão"
        readOnly
      />
      {employee?.resignationDate && (
        <ControlledInput
          value={convertDateToString(employee.resignationDate)}
          id="resignationDate"
          label="Data de demissão"
          readOnly
        />
      )}
      <ControlledInput
        value={convertStatus(employee?.status)}
        id="status"
        label="Status"
        readOnly
      />
      {employee?.addresses?.map(address => (
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
