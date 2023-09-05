'use client';

import { memo } from 'react';

import { Button } from '@/components/ui/buttons/button';

import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { convertStatus } from '@utils/status';

import { UserData } from './editUserForm.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditUserFormSchema, editUserFormSchema } from './editUserForm.schema';

const EditUserFormComponent = ({ user }: UserData) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormSchema>({
    resolver: zodResolver(editUserFormSchema),
  });

  const onSubmit: SubmitHandler<EditUserFormSchema> = data => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-4 sm:gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full max-w-[65rem] flex-row flex-wrap items-center justify-center gap-4 sm:gap-8">
        <ControlledInput
          id="name"
          label="Nome:"
          defaultValue={user.employee.name}
          register={register}
          errorMessage={errors.name?.message}
        />
        <ControlledInput
          id="cpf"
          label="CPF:"
          defaultValue={user.employee.cpf}
          register={register}
          errorMessage={errors.cpf?.message}
        />
        <ControlledInput
          id="email"
          label="Email:"
          defaultValue={user.email}
          register={register}
          errorMessage={errors.email?.message}
        />
        <ControlledInput
          id="user"
          label="Usuário:"
          defaultValue={user.user}
          register={register}
          errorMessage={errors.user?.message}
        />
        <ControlledInput
          id="status"
          label="Status:"
          defaultValue={convertStatus(user.status)}
          register={register}
          errorMessage={errors.status?.message}
        />
      </div>
      {/* Add roles and permissions with the logged user is admin */}

      <Button disabled={isSubmitting}>Salvar</Button>
    </form>
  );
};

export const EditUserForm = memo(EditUserFormComponent);
