'use client';

import { memo, useEffect, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BrandFormSchema, brandFormSchema } from './editBrandForm.schema';
import { Brand, BrandFormProps } from './editBrandForm.types';

const EditBrandFormComponent = ({
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
    formState: { errors, isSubmitting },
  } = useForm<BrandFormSchema>({
    resolver: zodResolver(brandFormSchema),
  });

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
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar a marca',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4">
        <ControlledInput value={brand?.id} id="id" label="Código" readOnly />
        <ControlledInput
          defaultValue={brand?.name}
          id="name"
          label="Marca"
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

export const EditBrandForm = memo(EditBrandFormComponent);
