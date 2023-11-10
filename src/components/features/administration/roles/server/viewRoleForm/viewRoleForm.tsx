import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { RoleData } from './viewRoleForm.types';

export const ViewRoleForm = ({ role }: RoleData) => {
  return (
    <FormGrid>
      <ControlledInput id="id" label="Código:" value={role?.id} readOnly />
      <ControlledInput
        id="name"
        label="Nome:"
        value={role?.description}
        readOnly
      />
      {/* TODO -> Add permissions */}
    </FormGrid>
  );
};
