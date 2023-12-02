'use client';

import { api } from '@axios';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CreateRoleFormSchema,
  createRoleFormSchema,
} from './createRoleForm.schema';
import { CreateRoleFormProps } from './createRoleForm.types';

export const CreateRoleForm = ({ handleCloseModal }: CreateRoleFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoleFormSchema>({
    resolver: zodResolver(createRoleFormSchema),
  });

  const onSubmit: SubmitHandler<CreateRoleFormSchema> = async data => {
    try {
      const { description } = data;
      const name = convertStringToSlug(description);
      await api.post(
        '/acl/roles',
        { name, description },
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
      {/* TODO -> Add permissions */}
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
