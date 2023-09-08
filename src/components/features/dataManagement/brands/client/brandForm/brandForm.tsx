'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { BrandFormProps } from './brandForm.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrandFormSchema, brandFormSchema } from './brandForm.schema';

export const BrandFormComponent = ({ brand }: BrandFormProps) => {
  const route = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormSchema>({
    resolver: zodResolver(brandFormSchema),
  });

  const onSubmit: SubmitHandler<BrandFormSchema> = async data => {
    try {
      await api.put(`/brands/${brand.id}`, data);
      toast({
        title: 'Marca atualizada com sucesso',
        variant: 'default',
      });
      route.refresh();
      route.push('/data-management/brands');
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row gap-4">
        <ControlledInput value={brand.id} id="id" label="Código" readOnly />
        <ControlledInput
          defaultValue={brand.name}
          id="name"
          label="Marca"
          register={register}
          errorMessage={errors.name?.message}
        />
      </div>
      <Button disabled={isSubmitting} type="submit" className="self-end">
        Alterar
      </Button>
    </form>
  );
};

export const BrandForm = memo(BrandFormComponent);
