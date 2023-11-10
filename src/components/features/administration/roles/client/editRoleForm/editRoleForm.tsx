'use client';

import { useEffect } from 'react';

import { api } from '@axios';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { toast } from '@components/ui/shadcn/toast/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditRoleFormSchema, editRoleFormSchema } from './editRoleForm.schema';
import { EditRoleFormProps } from './editRoleForm.types';

export const EditRoleForm = ({ role, handleCloseModal }: EditRoleFormProps) => {
  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<EditRoleFormSchema>({
    resolver: zodResolver(editRoleFormSchema),
  });

  const onSubmit: SubmitHandler<EditRoleFormSchema> = async data => {
    try {
      await api.put(`/acl/roles/${role?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Perfil de acesso atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o perfil de acesso',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    setFocus('description');
  }, [setFocus]);

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        id="id"
        label="Código:"
        defaultValue={role?.id}
        register={register}
        readOnly
      />
      <ControlledInput
        id="description"
        label="Descrição"
        defaultValue={role?.description}
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
        Salvar
      </Button>
    </FormGrid>
  );
};
