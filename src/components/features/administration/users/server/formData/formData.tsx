import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { convertStatus } from '@utils/status';

import { UserData } from './formData.types';

export const FormData = ({ user }: UserData) => {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4 sm:gap-8">
      <ControlledInput
        id="name"
        label="Nome:"
        value={user.employee.name}
        readOnly
      />
      <ControlledInput
        id="cpf"
        label="CPF:"
        value={user.employee.cpf}
        readOnly
      />
      <ControlledInput id="email" label="Email:" value={user.email} readOnly />
      <ControlledInput id="user" label="Usuário:" value={user.user} readOnly />
      <ControlledInput
        id="status"
        label="Status:"
        value={convertStatus(user.status)}
        readOnly
      />

      {/* Add roles and permissions with the logged user is admin */}
    </div>
  );
};
