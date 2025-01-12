'use client';

import { api } from '@axios';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { BrandFormSchema, brandFormSchema } from './createBrandForm.schema';
import { BrandFormProps } from './createBrandForm.types';

export const CreateBrandFormComponent = ({
  handleCloseModal,
}: BrandFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormSchema>({
    resolver: zodResolver(brandFormSchema),
  });

  const onSubmit: SubmitHandler<BrandFormSchema> = async data => {
    try {
      await api.post(
        '/brands',
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Marca criada com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar a marca',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        id="name"
        label="Marca"
        placeholder="Marca"
        register={register}
        errorMessage={errors.name?.message}
        isRequired
      />

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:self-end"
      >
        Criar
      </Button>
    </form>
  );
};

export const CreateBrandForm = memo(CreateBrandFormComponent);
