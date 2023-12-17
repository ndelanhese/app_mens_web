'use client';

import { useCallback, useEffect, useState } from 'react';

import { generateRandomNumber } from '@/utils/helpers';
import { CheckboxTree } from '@/components/shared/checkboxTree';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { getPermissions, getRole } from '../../api';
import { PermissionGroup, Role } from '../../api/apiData.types';
import { RoleData } from './viewRoleForm.types';

export const ViewRoleForm = ({ role }: RoleData) => {
  const [roleData, setRoleData] = useState<Role | undefined>(undefined);
  const [permissions, setPermissions] = useState<PermissionGroup[] | undefined>(
    undefined,
  );

  const permissionsResponse = useCallback(async () => {
    const response = await getPermissions();
    setPermissions(response);
  }, []);

  const getRoleData = useCallback(async () => {
    const response = await getRole(role?.id);
    setRoleData(response);
  }, [role?.id]);

  useEffect(() => {
    permissionsResponse();
    getRoleData();
  }, [getRoleData, permissionsResponse]);

  return (
    <FormGrid>
      <ControlledInput id="id" label="Código:" value={role?.id} readOnly />
      <ControlledInput
        id="name"
        label="Nome:"
        value={role?.description}
        readOnly
      />

      {permissions &&
        roleData &&
        permissions.map(permissionsGroup => {
          const permissionsChildren = permissionsGroup.permissions.map(
            permission => ({
              id: permission.id,
              label: permission.description,
            }),
          );

          const treeChildren = permissionsChildren.map(child => child.label);
          const treeChildrenIds = permissionsChildren.map(child => child.id);

          return (
            <div
              key={permissionsGroup.group_name}
              className="my-2 flex items-start justify-start sm:my-0"
            >
              <CheckboxTree
                title={permissionsGroup.group_name}
                id={generateRandomNumber(200, 1000)}
                treeChildren={treeChildren}
                treeChildrenIds={treeChildrenIds}
                defaultChecked={roleData?.permissions}
                disabled
              />
            </div>
          );
        })}
    </FormGrid>
  );
};
