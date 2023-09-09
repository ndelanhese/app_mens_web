'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrandFormSchema, brandFormSchema } from './createBrandForm.schema';
import { BrandFormProps } from './createBrandForm.types';

export const CreateBrandFormComponent = ({
  handleCloseModal,
}: BrandFormProps) => {
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
      await api.post('/brands', { ...data });
      toast({
        title: 'Marca criada com sucesso',
        variant: 'default',
      });
      route.refresh();
      handleCloseModal();
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar a marca',
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
        label="Marca"
        register={register}
        errorMessage={errors.name?.message}
      />

      <Button disabled={isSubmitting} type="submit" className="sm:self-end">
        Criar
      </Button>
    </form>
  );
};

export const CreateBrandForm = memo(CreateBrandFormComponent);
