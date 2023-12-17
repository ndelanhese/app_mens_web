'use client';

import { useCallback, useEffect, useState } from 'react';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { getRole } from '../../api';
import { Role } from '../../api/apiData.types';
import { RoleData } from './viewRoleForm.types';

export const ViewRoleForm = ({ role }: RoleData) => {
  const [roleData, setRoleData] = useState<Role | undefined>(undefined);

  const getRoleData = useCallback(async () => {
    const response = await getRole(role?.id);
    setRoleData(response);
  }, [role?.id]);

  useEffect(() => {
    getRoleData();
  }, [getRoleData]);

  return (
    <FormGrid>
      <ControlledInput id="id" label="Código:" value={role?.id} readOnly />
      <ControlledInput
        id="name"
        label="Nome:"
        value={role?.description}
        readOnly
      />
    </FormGrid>
  );
};
