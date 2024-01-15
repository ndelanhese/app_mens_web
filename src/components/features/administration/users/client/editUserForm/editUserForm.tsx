/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
'use client';

import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { api } from '@axios';
import {
  SelectGroupedOption,
  SelectOption,
} from '@/components/ui/selects/controlledSelect.types';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { PasswordInput } from '@components/ui/inputs/passwordInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { RefModalProps } from '@components/shared/table/table.types';
import { CreateRoleForm } from '@components/features/administration/roles/client/createRoleForm/createRoleForm';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { GroupBase } from 'react-select';
import { getEmployees, getPermissions, getRoles } from '../api/apiData';
import { EditUserFormSchema, editUserFormSchema } from './editUserForm.schema';
import {
  CreatableSelects,
  EditUserFormProps,
  Employees,
  NewItemModal,
  PermissionsGroup,
  Roles,
} from './editUserForm.types';

export const EditUserForm = ({ user, handleCloseModal }: EditUserFormProps) => {
  const { token } = parseCookies();

  const createItemModalRef = useRef<RefModalProps | null>(null);
  const [newItemModal, setNewItemModal] = useState<NewItemModal | undefined>(
    undefined,
  );

  const [employees, setEmployees] = useState<Employees[] | undefined>(
    undefined,
  );
  const [roles, setRoles] = useState<Roles[] | undefined>(undefined);
  const [permissionsGroup, setPermissionsGroup] = useState<
    PermissionsGroup[] | undefined
  >(undefined);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormSchema>({
    resolver: zodResolver(editUserFormSchema),
  });

  const onSubmit: SubmitHandler<EditUserFormSchema> = async data => {
    try {
      const {
        employee,
        confirm_password,
        new_password: newPassword,
        roles,
        permissions,
        ...rest
      } = data;
      await api.put(
        `/users/${user?.id}`,
        {
          ...rest,
          employee_id: employee.value,
          status: 'active',
          password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      await api.put(
        `/users/${user?.id}/roles-permissions`,
        { roles, permissions },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleCloseModal();
      toast({
        title: 'Usuário atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o usuário',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const getEmployeesData = useCallback(async () => {
    const response = await getEmployees();
    setEmployees(response);
  }, []);

  const getRolesData = useCallback(async () => {
    const response = await getRoles();
    setRoles(response);
  }, []);

  const getPermissionsGroupData = useCallback(async () => {
    const response = await getPermissions();
    setPermissionsGroup(response);
  }, []);

  useEffect(() => {
    getEmployeesData();
    getRolesData();
    getPermissionsGroupData();
  }, [getEmployeesData, getPermissionsGroupData, getRolesData]);

  const memorizedEmployeesOptions = useMemo(() => {
    if (employees) {
      return employees.map(employee => ({
        value: employee.id.toString(),
        label: `${employee.name.trim()} - ${employee.cpf}`,
      }));
    }
    return [];
  }, [employees]);

  const memorizedRolesOptions = useMemo(() => {
    if (roles) {
      return roles.map(role => ({
        value: role.id.toString(),
        label: role.description,
      }));
    }
    return [];
  }, [roles]);

  const memorizedPermissionsOptions = useMemo(() => {
    if (permissionsGroup) {
      return permissionsGroup.map(group => {
        const permissions = group.permissions.map(permission => ({
          value: permission.id.toString(),
          label: permission.description,
        }));
        return {
          label: group.group_name,
          options: permissions,
        };
      });
    }
    return [];
  }, [permissionsGroup]);

  const memoizedUserRoles = useMemo(
    () => user?.user_roles?.map(role => role?.id?.toString()),
    [user?.user_roles],
  );

  const memoizedUserPermissions = useMemo(
    () => user?.permissions?.map(permission => permission?.id?.toString()),
    [user?.permissions],
  );

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles: CSSProperties = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const formatGroupLabel = (data: GroupBase<unknown>) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const handleCloseNewItemModal = useCallback(async () => {
    await getRolesData();
    setNewItemModal(undefined);
    createItemModalRef.current?.close();
  }, [getRolesData]);

  useEffect(() => {
    if (newItemModal) {
      createItemModalRef.current?.open();
    }
  }, [newItemModal]);

  const newItemCallbackFunction = useCallback(
    async (inputName: string) => {
      inputName as CreatableSelects;

      setNewItemModal({
        newItemDialogContent: (
          <CreateRoleForm
            handleCloseModal={async () => {
              await handleCloseNewItemModal();
            }}
          />
        ),
        newItemDialogDescription: 'Criar nova categoria no sistema.',
        newItemDialogRef: ref => {
          createItemModalRef.current = ref;
        },
        newItemDialogTitle: 'Criar nova categoria',
        newItemName: inputName as CreatableSelects,
      });
    },
    [handleCloseNewItemModal],
  );

  return (
    <FormGrid
      onSubmit={handleSubmit(onSubmit)}
      newItemDialogContent={newItemModal?.newItemDialogContent}
      newItemDialogDescription={newItemModal?.newItemDialogDescription}
      newItemDialogTitle={newItemModal?.newItemDialogTitle}
      newItemDialogRef={newItemModal?.newItemDialogRef}
    >
      {memorizedEmployeesOptions && memorizedEmployeesOptions.length > 1 && (
        <ControlledSelect
          label="Funcionário"
          name="employee"
          control={control}
          defaultValue={user?.employee?.id.toString()}
          errorMessage={errors.employee?.message}
          options={memorizedEmployeesOptions}
          placeHolder="Selecione um Funcionário"
          searchLabel="Pesquisar funcionário"
          emptyLabel="Sem funcionários cadastrados"
          isRequired
          menuPosition="bottom"
        />
      )}

      <ControlledInput
        id="user"
        label="Usuário"
        defaultValue={user?.user}
        register={register}
        errorMessage={errors.user?.message}
        isRequired
      />
      <ControlledInput
        id="email"
        label="Email"
        defaultValue={user?.email}
        register={register}
        errorMessage={errors.email?.message}
        isRequired
      />
      <PasswordInput
        id="new_password"
        label="Nova Senha"
        placeholder="ex: S3nh4.user"
        register={register}
        errorMessage={errors.new_password?.message}
        isRequired
      />
      <PasswordInput
        id="confirm_password"
        label="Confirmar Senha"
        placeholder="ex: S3nh4.user"
        register={register}
        errorMessage={errors.confirm_password?.message}
        isRequired
      />

      {memorizedRolesOptions && memorizedRolesOptions.length > 0 && (
        <ControlledSelect
          label="Papéis"
          name="roles"
          control={control}
          defaultValue={memoizedUserRoles}
          errorMessage={errors.roles?.message}
          options={memorizedRolesOptions}
          placeHolder="Selecione um Papel"
          searchLabel="Pesquisar Papéis"
          emptyLabel="Sem papéis cadastrados"
          isMulti
          menuPosition="top"
          newItemLabel="Criar um novo papel?"
          newItemCallbackFunction={newItemCallbackFunction}
        />
      )}

      {memorizedPermissionsOptions &&
        memorizedPermissionsOptions.length > 0 && (
          <ControlledSelect
            label="Permissões"
            name="permissions"
            control={control}
            defaultValue={memoizedUserPermissions}
            errorMessage={errors.permissions?.message}
            options={
              memorizedPermissionsOptions as SelectOption[] &
                SelectGroupedOption[]
            }
            formatGroupLabel={formatGroupLabel}
            placeHolder="Selecione uma Permissão"
            searchLabel="Pesquisar Permissões"
            emptyLabel="Sem permissões cadastrados"
            isMulti
            menuPosition="top"
          />
        )}

      <div className="flex">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="h-fit w-full sm:col-start-2 sm:mt-8"
        >
          Editar Usuário
        </Button>
      </div>
    </FormGrid>
  );
};
