'use client';

import { useCallback, useEffect, useState } from 'react';

import { CheckboxTree } from '@/components/shared/checkboxTree';
import { generateRandomNumber } from '@/utils/helpers';
import { api } from '@axios';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { FormGridSkeleton } from '@components/shared/formGridSkeleton';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getPermissions } from '../../api';
import { PermissionGroup } from '../../api/apiData.types';
import {
  CreateRoleFormSchema,
  createRoleFormSchema,
} from './createRoleForm.schema';
import { CreateRoleFormProps } from './createRoleForm.types';

export const CreateRoleForm = ({ handleCloseModal }: CreateRoleFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();
  const [permissions, setPermissions] = useState<PermissionGroup[] | undefined>(
    undefined,
  );
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: number[];
  }>({});

  const permissionsResponse = useCallback(async () => {
    const response = await getPermissions();
    setPermissions(response);
  }, []);

  useEffect(() => {
    permissionsResponse();
  }, [permissionsResponse]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoleFormSchema>({
    resolver: zodResolver(createRoleFormSchema),
  });

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

  const onSubmit: SubmitHandler<CreateRoleFormSchema> = async data => {
    try {
      const { description } = data;
      const name = convertStringToSlug(description);
      const permissionsIds = getPermissionsIds(selectedPermissions);
      await api.post(
        '/acl/roles',
        { name, description, permissions: permissionsIds },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Perfil de acesso criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o perfil de acesso',
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

  const isLoading = !permissions;

  if (isLoading) {
    return <FormGridSkeleton />;
  }

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        id="description"
        label="Descrição"
        placeholder="Ex: Gerente de loja"
        register={register}
        errorMessage={errors.description?.message}
        isRequired
      />
      <div />

      {permissions &&
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
        Criar
      </Button>
    </FormGrid>
  );
};
