'use client';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { toast } from '@components/ui/shadcn/toast/use-toast';

import { convertStatus } from '@utils/status';

import { EditUserFormProps } from './editUserForm.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditUserFormSchema, editUserFormSchema } from './editUserForm.schema';
import { parseCookies } from 'nookies';

export const EditUserForm = ({ user, handleCloseModal }: EditUserFormProps) => {
  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormSchema>({
    resolver: zodResolver(editUserFormSchema),
  });

  const onSubmit: SubmitHandler<EditUserFormSchema> = async data => {
    try {
      await api.put(`/users/${user?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        id="name"
        label="Nome:"
        defaultValue={user?.employee.name}
        register={register}
        errorMessage={errors.name?.message}
        readOnly
      />
      <ControlledInput
        id="cpf"
        label="CPF:"
        defaultValue={user?.employee.cpf}
        register={register}
        errorMessage={errors.cpf?.message}
      />
      <ControlledInput
        id="email"
        label="Email:"
        defaultValue={user?.email}
        register={register}
        errorMessage={errors.email?.message}
      />
      <ControlledInput
        id="user"
        label="Usuário:"
        defaultValue={user?.user}
        register={register}
        errorMessage={errors.user?.message}
      />
      <ControlledInput
        id="status"
        label="Status:"
        defaultValue={convertStatus(user?.status)}
        register={register}
        errorMessage={errors.status?.message}
        readOnly
      />

      {/* Add roles and permissions with the logged user is admin */}

      <Button disabled={isSubmitting} type="submit" className="h-min self-end">
        Salvar
      </Button>
    </FormGrid>
  );
};
