'use client';

import { memo, useEffect } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CategoryFormSchema,
  categoryFormSchema,
} from './editCategoryForm.schema';
import { CategoryFormProps } from './editCategoryForm.types';

const EditCategoryFormComponent = ({
  category,
  handleCloseModal,
}: CategoryFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
  });

  const onSubmit: SubmitHandler<CategoryFormSchema> = async data => {
    try {
      await api.put(`/categories/${category?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Categoria atualizada com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar a categoria',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <form
      className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput value={category?.id} id="id" label="Código" readOnly />
      <ControlledInput
        defaultValue={category?.name}
        id="name"
        label="Categoria"
        register={register}
        errorMessage={errors.name?.message}
        isRequired
      />

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Alterar categoria
      </Button>
    </form>
  );
};

export const EditCategoryForm = memo(EditCategoryFormComponent);
