'use client';

import { api } from '@axios';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CategoryFormSchema,
  categoryFormSchema,
} from './createCategoryForm.schema';
import { CategoryFormProps } from './createCategoryForm.types';

export const CreateCategoryForm = ({ handleCloseModal }: CategoryFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
  });

  const onSubmit: SubmitHandler<CategoryFormSchema> = async data => {
    try {
      await api.post(
        '/categories',
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await handleCloseModal();
      toast({
        title: 'Categoria criada com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar a categoria',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        id="name"
        label="Categoria"
        placeholder="Categoria"
        register={register}
        errorMessage={errors.name?.message}
        isRequired
      />

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Criar categoria
      </Button>
    </FormGrid>
  );
};
