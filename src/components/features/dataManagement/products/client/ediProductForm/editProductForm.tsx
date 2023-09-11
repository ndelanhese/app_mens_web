'use client';

import { memo, useEffect, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { Product, ProductFormProps } from './editProductForm.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormSchema, productFormSchema } from './editProductForm.schema';

const EditProductFormComponent = ({
  getProductFunction,
  handleCloseModal,
}: ProductFormProps) => {
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    const productData = getProductFunction();
    setProduct(productData);
  }, [getProductFunction]);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit: SubmitHandler<ProductFormSchema> = async data => {
    try {
      await api.put(`/products/${product?.id}`, data);
      handleCloseModal();
      toast({
        title: 'Produto atualizado com sucesso',
        variant: 'default',
      });
      // route.refresh();
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o produto',
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
      <div className="flex w-full flex-col gap-4 overflow-y-auto sm:max-h-[30rem]">
        <ControlledInput value={product?.id} id="id" label="Código" readOnly />
        <ControlledInput
          defaultValue={product?.name}
          id="name"
          label="Nome"
          register={register}
          errorMessage={errors.name?.message}
        />
        <ControlledInput
          defaultValue={product?.partNumber}
          id="partNumber"
          label="Part Number"
          register={register}
          errorMessage={errors.partNumber?.message}
        />
        <ControlledInput
          defaultValue={product?.description}
          id="description"
          label="Descrição"
          register={register}
          errorMessage={errors.description?.message}
        />
        <ControlledInput
          defaultValue={product?.price}
          id="price"
          label="Preço"
          register={register}
          errorMessage={errors.price?.message}
        />
        <ControlledInput
          defaultValue={product?.size}
          id="size"
          label="Tamanho"
          register={register}
          errorMessage={errors.size?.message}
        />
        <ControlledInput
          defaultValue={product?.color}
          id="color"
          label="Cor"
          register={register}
          errorMessage={errors.color?.message}
        />
        <ControlledInput
          defaultValue={product?.quantity}
          id="quantity"
          label="Quantidade"
          register={register}
          errorMessage={errors.quantity?.message}
        />
        <ControlledInput
          defaultValue={product?.category}
          id="category"
          label="Categoria"
          register={register}
          errorMessage={errors.category?.message}
        />
        <ControlledInput
          defaultValue={product?.brand}
          id="brand"
          label="Marca"
          register={register}
          errorMessage={errors.brand?.message}
        />
      </div>
      <Button disabled={isSubmitting} type="submit" className="sm:self-end">
        Alterar
      </Button>
    </form>
  );
};

export const EditProductForm = memo(EditProductFormComponent);
