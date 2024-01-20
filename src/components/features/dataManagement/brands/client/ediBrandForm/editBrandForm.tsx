'use client';

import { api } from '@axios';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { BrandFormSchema, brandFormSchema } from './editBrandForm.schema';
import { Brand, BrandFormProps } from './editBrandForm.types';

export const EditBrandForm = ({
  getBrandFunction,
  handleCloseModal,
}: BrandFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [brand, setBrand] = useState<Brand | undefined>(undefined);

  useEffect(() => {
    const brandData = getBrandFunction();
    setBrand(brandData);
  }, [getBrandFunction]);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormSchema>({
    resolver: zodResolver(brandFormSchema),
  });

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmit: SubmitHandler<BrandFormSchema> = async data => {
    try {
      await api.put(`/brands/${brand?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Marca atualizada com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar a marca',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput value={brand?.id} id="id" label="Código" readOnly />
      <ControlledInput
        defaultValue={brand?.name}
        id="name"
        label="Marca"
        placeholder="Marca"
        register={register}
        errorMessage={errors.name?.message}
        isRequired
      />
      <Button disabled={isSubmitting} type="submit" className="sm:col-start-2">
        Editar
      </Button>
    </FormGrid>
  );
};
