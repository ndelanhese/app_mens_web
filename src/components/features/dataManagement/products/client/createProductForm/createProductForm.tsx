'use client';

import { memo } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProductFormSchema,
  productFormSchema,
} from './createProductForm.schema';
import { ProductFormProps } from './createProductForm.types';

const CreateProductFormComponent = ({ handleCloseModal }: ProductFormProps) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit: SubmitHandler<ProductFormSchema> = async data => {
    try {
      await api.post('/products', { ...data });
      handleCloseModal();
      toast({
        title: 'Produto criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o produto',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-6 overflow-y-auto sm:max-h-[30rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        id="name"
        label="Nome"
        register={register}
        errorMessage={errors.name?.message}
      />
      <ControlledInput
        id="partNumber"
        label="Part Number"
        register={register}
        errorMessage={errors.partNumber?.message}
      />
      <ControlledInput
        id="description"
        label="Descrição"
        register={register}
        errorMessage={errors.description?.message}
      />
      <ControlledInput
        id="price"
        label="Preço"
        register={register}
        errorMessage={errors.price?.message}
      />
      <ControlledInput
        id="size"
        label="Tamanho"
        register={register}
        errorMessage={errors.size?.message}
      />
      <ControlledInput
        id="color"
        label="Cor"
        register={register}
        errorMessage={errors.color?.message}
      />
      <ControlledInput
        id="quantity"
        label="Quantidade"
        register={register}
        errorMessage={errors.quantity?.message}
      />
      <ControlledInput
        id="category"
        label="Categoria"
        register={register}
        errorMessage={errors.category?.message}
      />
      <ControlledInput
        id="brand"
        label="Marca"
        register={register}
        errorMessage={errors.brand?.message}
      />

      <Button disabled={isSubmitting} type="submit" className="sm:self-end">
        Criar
      </Button>
    </form>
  );
};

export const CreateProductForm = memo(CreateProductFormComponent);
