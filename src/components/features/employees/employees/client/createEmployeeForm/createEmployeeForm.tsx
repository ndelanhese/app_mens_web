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
        title: 'Funcionário criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o funcionário',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

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
      />
      <ControlledInput
        id="rg"
        label="RG"
        register={register}
        errorMessage={errors.rg?.message}
      />
      <ControlledInput
        id="birth_date"
        label="Data de nascimento"
        register={register}
        errorMessage={errors.birth_date?.message}
      />
      <ControlledInput
        id="phone"
        label="Celular"
        register={register}
        errorMessage={errors.phone?.message}
      />
      <ControlledInput
        id="pis_pasep"
        label="PIS/PASEP"
        register={register}
        errorMessage={errors.pis_pasep?.message}
      />
      <ControlledInput
        id="admission_date"
        label="Data de admissão"
        register={register}
        errorMessage={errors.admission_date?.message}
      />
      <ControlledInput
        id="resignation_date"
        label="Data de demissão"
        register={register}
        errorMessage={errors.resignation_date?.message}
      />
      <ControlledInput
        id="address.address"
        label="Endereço"
        register={register}
        errorMessage={errors.address?.address?.message}
      />
      <ControlledInput
        id="address.number"
        label="Número"
        register={register}
        errorMessage={errors.address?.number?.message}
      />
      <ControlledInput
        id="address.district"
        label="Bairro"
        register={register}
        errorMessage={errors.address?.district?.message}
      />
      <ControlledInput
        id="address.postal_code"
        label="CEP"
        register={register}
        errorMessage={errors.address?.postal_code?.message}
      />
      <ControlledInput
        id="address.city"
        label="Cidade"
        register={register}
        errorMessage={errors.address?.city?.message}
      />
      <ControlledInput
        id="address.state"
        label="Estado"
        register={register}
        errorMessage={errors.address?.state?.message}
      />
      <Button disabled={isSubmitting} type="submit" className="sm:col-start-2">
        Criar
      </Button>
    </form>
  );
};

export const CreateEmployeeForm = memo(CreateEmployeeFormComponent);
