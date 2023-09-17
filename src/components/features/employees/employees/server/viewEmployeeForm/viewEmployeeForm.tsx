import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { EmployeePreviewProps } from './viewEmployeeForm.types';

export const ViewEmployeeForm = ({ employee }: EmployeePreviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-y-auto sm:max-h-[30rem] sm:grid-cols-2">
      <ControlledInput value={employee?.id} id="id" label="Código" readOnly />
      <ControlledInput value={employee?.name} id="name" label="Nome" readOnly />
      <ControlledInput value={employee?.cpf} id="cpf" label="CPF" readOnly />
      <ControlledInput
        value={employee?.phone}
        id="phone"
        label="Celular"
        readOnly
      />
    </div>
  );
};
