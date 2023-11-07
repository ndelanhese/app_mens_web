'use client';

import { api } from '@axios';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { PasswordInput } from '@components/ui/inputs/passwordInput';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  EditUserFormSchema,
  editUserFormSchema,
} from './createUserForm.schema';
import { CreateUserFormProps } from './createUserForm.types';

export const CreateUserForm = ({ handleCloseModal }: CreateUserFormProps) => {
  const { toast } = useToast();

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
      await api.post(
        '/users',
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Usuário criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o usuário',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      {/* TODO -> add employee */}

      <ControlledInput
        id="name"
        label="Usuário"
        placeholder="Ex: nome.sobrenome"
        register={register}
        errorMessage={errors.user?.message}
        isRequired
      />
      <ControlledInput
        id="email"
        label="E-mail"
        placeholder="Ex: nome.sobrenome@loja.com"
        register={register}
        errorMessage={errors.email?.message}
        isRequired
        type="email"
      />
      <PasswordInput
        id="password"
        label="Senha"
        placeholder="ex: S3nh4.user"
        register={register}
        errorMessage={errors.password?.message}
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
