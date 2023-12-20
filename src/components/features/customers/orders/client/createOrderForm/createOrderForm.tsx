'use client';

import { memo } from 'react';

import { api } from '@axios';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { OrderFormSchema, orderFormSchema } from './createOrderForm.schema';
import { OrderFormProps } from './createOrderForm.types';

const CreateOrderFormComponent = ({ handleCloseModal }: OrderFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
  });

  const onSubmit: SubmitHandler<OrderFormSchema> = async data => {
    try {
      await api.post('/orders', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Pedido criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar a pedido',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        id="description"
        label="Descrição"
        placeholder="Ex. Pedido de calças para..."
        register={register}
        errorMessage={errors.description?.message}
        isRequired
      />

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Criar pedido
      </Button>
    </FormGrid>
  );
};

export const CreateOrderForm = memo(CreateOrderFormComponent);
