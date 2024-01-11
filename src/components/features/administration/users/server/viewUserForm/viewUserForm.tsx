import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { convertStatus } from '@utils/status';

import { UserData } from './viewUserForm.types';

export const ViewUserForm = ({ user }: UserData) => {
  return (
    <FormGrid>
      <ControlledInput
        id="name"
        label="Nome:"
        value={user?.employee?.name}
        readOnly
      />
      <ControlledInput id="email" label="Email:" value={user?.email} readOnly />
      <ControlledInput id="user" label="Usuário:" value={user?.user} readOnly />
      <ControlledInput
        id="status"
        label="Status:"
        value={convertStatus(user?.status)}
        readOnly
      />
    </FormGrid>
  );
};
