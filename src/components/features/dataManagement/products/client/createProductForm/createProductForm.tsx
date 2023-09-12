'use client';

import { memo } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ProductFormSchema,
  productFormSchema,
} from './createProductForm.schema';
import { ProductFormProps } from './createProductForm.types';
import { parseCookies } from 'nookies';

const CreateProductFormComponent = ({ handleCloseModal }: ProductFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit: SubmitHandler<ProductFormSchema> = async data => {
    try {
      await api.post(
        '/products',
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } },
      );
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
        placeholder="Nome do produto"
      />
      <ControlledInput
        id="partNumber"
        label="Part Number"
        register={register}
        errorMessage={errors.partNumber?.message}
        placeholder="Part Number do produto"
      />
      <ControlledInput
        id="description"
        label="Descrição"
        register={register}
        errorMessage={errors.description?.message}
        placeholder="Descrição do produto"
      />
      <ControlledInput
        id="price"
        label="Preço"
        register={register}
        errorMessage={errors.price?.message}
        placeholder="Preço do produto"
      />
      <ControlledInput
        id="size"
        label="Tamanho"
        register={register}
        errorMessage={errors.size?.message}
        placeholder="Tamanho do produto"
      />
      <ControlledInput
        id="color"
        label="Cor"
        register={register}
        errorMessage={errors.color?.message}
        placeholder="Cor do produto"
      />
      <ControlledInput
        id="quantity"
        label="Quantidade"
        register={register}
        errorMessage={errors.quantity?.message}
        placeholder="Quantidade do produto"
      />
      <ControlledInput
        id="category"
        label="Categoria"
        register={register}
        errorMessage={errors.category?.message}
        placeholder="Categoria do produto"
      />
      <ControlledInput
        id="brand"
        label="Marca"
        register={register}
        errorMessage={errors.brand?.message}
        placeholder="Marca do produto"
      />

      <Button disabled={isSubmitting} type="submit" className="sm:self-end">
        Criar
      </Button>
    </form>
  );
};

export const CreateProductForm = memo(CreateProductFormComponent);
