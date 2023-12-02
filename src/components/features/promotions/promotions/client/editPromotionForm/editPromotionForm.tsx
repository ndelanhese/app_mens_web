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
  PromotionFormSchema,
  promotionFormSchema,
} from './editPromotionForm.schema';
import { PromotionFormProps } from './editPromotionForm.types';

const EditPromotionFormComponent = ({
  promotion,
  handleCloseModal,
}: PromotionFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<PromotionFormSchema>({
    resolver: zodResolver(promotionFormSchema),
  });

  const onSubmit: SubmitHandler<PromotionFormSchema> = async data => {
    try {
      await api.put(`/promotions/${promotion?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Promoção atualizada com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar a promoção',
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
      <ControlledInput value={promotion?.id} id="id" label="Código" readOnly />
      <ControlledInput
        defaultValue={promotion?.name}
        id="name"
        label="Promoção"
        register={register}
        errorMessage={errors.name?.message}
        isRequired
      />

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Alterar promoção
      </Button>
    </form>
  );
};

export const EditPromotionForm = memo(EditPromotionFormComponent);
