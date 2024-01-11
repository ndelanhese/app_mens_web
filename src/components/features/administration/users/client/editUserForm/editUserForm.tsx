/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';

import { api } from '@axios';

import { PasswordInput } from '@components/ui/inputs/passwordInput';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { toast } from '@components/ui/shadcn/toast/use-toast';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';

import { convertStatus } from '@utils/status';

import { EditUserFormProps, Employees } from './editUserForm.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditUserFormSchema, editUserFormSchema } from './editUserForm.schema';
import { parseCookies } from 'nookies';
import { getEmployees } from '../api/apiData';

export const EditUserForm = ({ user, handleCloseModal }: EditUserFormProps) => {
  const { token } = parseCookies();
  const [employees, setEmployees] = useState<Employees[] | undefined>(
    undefined,
  );
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
        current_password: currentPassword,
        new_password: newPassword,
        ...rest
      } = data;
      await api.put(
        `/users/${user?.id}`,
        {
          ...rest,
          employee_id: employee.value,
          status: 'active',
          password: newPassword,
          current_password: currentPassword,
        },
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

  useEffect(() => {
    getEmployeesData();
  }, [getEmployeesData]);

  const memorizedEmployeesOptions = useMemo(() => {
    if (employees) {
      return employees.map(employee => ({
        value: employee.id.toString(),
        label: `${employee.name.trim()} - ${employee.cpf}`,
      }));
    }
    return [];
  }, [employees]);

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
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
        id="current_password"
        label="Senha Atual"
        placeholder="ex: S3nh4.user"
        register={register}
        errorMessage={errors.current_password?.message}
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
