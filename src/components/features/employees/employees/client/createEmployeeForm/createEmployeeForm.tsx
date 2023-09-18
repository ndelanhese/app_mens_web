'use client';

import { memo } from 'react';

import { ControlledSelect } from '@/components/ui/selects/controlledSelect';
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
} from './createEmployeeForm.schema';
import { EmployeeFormProps } from './createEmployeeForm.types';

const CreateEmployeeFormComponent = ({
  handleCloseModal,
}: EmployeeFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormSchema>({
    resolver: zodResolver(employeeFormSchema),
  });

  const onSubmit: SubmitHandler<EmployeeFormSchema> = async data => {
    try {
      await api.post(
        '/employees',
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Produto criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o produto',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  // TODO -> add all attributes
  return (
    <form
      className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:max-h-[30rem] sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        id="name"
        label="Nome"
        register={register}
        errorMessage={errors.name?.message}
      />
      <ControlledInput
        id="cpf"
        label="CPF"
        register={register}
        errorMessage={errors.cpf?.message}
        disabled
      />
      <ControlledInput
        id="phone"
        label="Celular"
        register={register}
        errorMessage={errors.phone?.message}
      />

      <Button disabled={isSubmitting} type="submit" className="sm:self-end">
        Criar
      </Button>
    </form>
  );
};

export const CreateEmployeeForm = memo(CreateEmployeeFormComponent);
