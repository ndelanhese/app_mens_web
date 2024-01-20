'use client';

import { api } from '@axios';
import { CheckboxTree } from '@components/shared/checkboxTree';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { FormGridSkeleton } from '@components/shared/formGridSkeleton';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateRandomNumber } from '@utils/helpers';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getPermissions, getRole } from '../../api';
import { PermissionGroup, Role } from '../../api/apiData.types';
import { EditRoleFormSchema, editRoleFormSchema } from './editRoleForm.schema';
import { EditRoleFormProps } from './editRoleForm.types';

export const EditRoleForm = ({ role, handleCloseModal }: EditRoleFormProps) => {
  const { token } = parseCookies();

  const [roleData, setRoleData] = useState<Role | undefined>(undefined);
  const [permissions, setPermissions] = useState<PermissionGroup[] | undefined>(
    undefined,
  );
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: number[];
  }>({});

  const getPermissionsIds = useCallback(
    (permissions: { [key: string]: number[] }) => {
      const ids: number[] = [];

      for (const key of Object.keys(permissions)) {
        for (const item of permissions[key]) {
          ids.push(item);
        }
      }

      return ids;
    },
    [],
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
    if (role?.id) {
      permissionsResponse();
      getRoleData();
    }
  }, [getRoleData, permissionsResponse, role?.id]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<EditRoleFormSchema>({
    resolver: zodResolver(editRoleFormSchema),
  });

  const handleClearAllStates = useCallback(() => {
    setRoleData(undefined);
    setPermissions(undefined);
    setSelectedPermissions({});
  }, []);

  const onSubmit: SubmitHandler<EditRoleFormSchema> = async data => {
    try {
      const permissionsIds = getPermissionsIds(selectedPermissions);
      await api.put(
        `/acl/roles/${role?.id}`,
        { ...data, permissions: permissionsIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleClearAllStates();
      handleCloseModal();
      toast({
        title: 'Perfil de acesso atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o perfil de acesso',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleChangePermissions = useCallback(
    (value: Array<number>, title: string) => {
      setSelectedPermissions(prev => ({
        ...prev,
        [title]: value,
      }));
    },
    [],
  );

  useEffect(() => {
    setFocus('description');
  }, [setFocus]);

  const isLoading = !permissions;

  if (isLoading) {
    return <FormGridSkeleton qtyOfInputs={2} />;
  }

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        id="id"
        label="Código:"
        defaultValue={role?.id}
        register={register}
        readOnly
      />
      <ControlledInput
        id="description"
        label="Descrição"
        defaultValue={role?.description}
        register={register}
        errorMessage={errors.description?.message}
        isRequired
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
          const intersection =
            treeChildrenIds?.filter(value =>
              roleData?.permissions?.includes(value),
            ) || [];

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
                defaultChecked={intersection}
                handleChange={handleChangePermissions}
              />
            </div>
          );
        })}

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:self-end"
      >
        Salvar
      </Button>
    </FormGrid>
  );
};
