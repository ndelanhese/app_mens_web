'use client';

import { memo } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CategoryFormSchema,
  categoryFormSchema,
} from './createCategoryForm.schema';
import { CategoryFormProps } from './createCategoryForm.types';

export const CreateCategoryFormComponent = ({
  handleCloseModal,
}: CategoryFormProps) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
  });

  const onSubmit: SubmitHandler<CategoryFormSchema> = async data => {
    try {
      await api.post('/categories', { ...data });
      handleCloseModal();
      toast({
        title: 'Categoria criada com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar a categoria',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-6 sm:h-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        id="name"
        label="Categoria"
        register={register}
        errorMessage={errors.name?.message}
      />

      <Button disabled={isSubmitting} type="submit" className="sm:self-end">
        Criar
      </Button>
    </form>
  );
};

export const CreateCategoryForm = memo(CreateCategoryFormComponent);
