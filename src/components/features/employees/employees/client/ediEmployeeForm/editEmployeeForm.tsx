'use client';

import { memo, useEffect, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  EmployeeFormSchema,
  employeeFormSchema,
} from './editEmployeeForm.schema';
import { Employee, EmployeeFormProps } from './editEmployeeForm.types';

const EditEmployeeFormComponent = ({
  getEmployeesFunction,
  handleCloseModal,
}: EmployeeFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [employee, setEmployee] = useState<Employee | undefined>(undefined);

  useEffect(() => {
    const employeeData = getEmployeesFunction();
    setEmployee(employeeData);
  }, [getEmployeesFunction]);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormSchema>({
    resolver: zodResolver(employeeFormSchema),
  });

  const onSubmit: SubmitHandler<EmployeeFormSchema> = async data => {
    try {
      await api.put(`/employees/${employee?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Produto atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o produto',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  if (!employee) {
    // TODO -> Add skeleton
    return <h1>Carregando...</h1>;
  }

  // TODO -> add all attributes
  return (
    <form
      className="flex h-full w-full flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:max-h-[30rem] sm:grid-cols-2">
        <ControlledInput value={employee?.id} id="id" label="Código" readOnly />
        <ControlledInput
          defaultValue={employee?.name}
          id="name"
          label="Nome"
          register={register}
          errorMessage={errors.name?.message}
        />
        <ControlledInput
          defaultValue={employee?.cpf}
          id="cpf"
          label="CPF"
          register={register}
          errorMessage={errors.cpf?.message}
          disabled
        />
        <ControlledInput
          defaultValue={employee?.phone}
          id="phone"
          label="Celular"
          register={register}
          errorMessage={errors.phone?.message}
        />
      </div>
      <Button disabled={isSubmitting} type="submit" className=" sm:self-end">
        Alterar
      </Button>
    </form>
  );
};

export const EditEmployeeForm = memo(EditEmployeeFormComponent);
