'use client';

import { memo, useEffect, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { Category, CategoryFormProps } from './editCategoryForm.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CategoryFormSchema,
  categoryFormSchema,
} from './editCategoryForm.schema';

const EditCategoryFormComponent = ({
  getCategoryFunction,
  handleCloseModal,
}: CategoryFormProps) => {
  const { toast } = useToast();

  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const categoryData = getCategoryFunction();
    setCategory(categoryData);
  }, [getCategoryFunction]);

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
      await api.put(`/categories/${category?.id}`, data);
      handleCloseModal();
      toast({
        title: 'Categoria atualizada com sucesso',
        variant: 'default',
      });
      // route.refresh();
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
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
      className="flex w-full flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4">
        <ControlledInput value={category?.id} id="id" label="Código" readOnly />
        <ControlledInput
          defaultValue={category?.name}
          id="name"
          label="Categoria"
          register={register}
          errorMessage={errors.name?.message}
        />
      </div>
      <Button disabled={isSubmitting} type="submit" className="sm:self-end">
        Alterar
      </Button>
    </form>
  );
};

export const EditCategoryForm = memo(EditCategoryFormComponent);
