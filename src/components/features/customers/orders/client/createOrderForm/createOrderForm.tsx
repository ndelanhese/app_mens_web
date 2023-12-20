'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { currentDateString } from '@utils/helpers/date';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCustomers, getStatus } from '../../api/apiData';
import { OrderFormSchema, orderFormSchema } from './createOrderForm.schema';
import { Customer, OrderFormProps, Status } from './createOrderForm.types';

const CreateOrderFormComponent = ({ handleCloseModal }: OrderFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);
  const [status, setStatus] = useState<Status[] | undefined>(undefined);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      date: currentDateString(),
    },
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

  const getCustomersData = useCallback(async () => {
    const customersResponse = await getCustomers();
    setCustomers(customersResponse);
  }, []);

  const getStatusData = useCallback(async () => {
    const response = await getStatus();
    setStatus(response);
  }, []);

  useEffect(() => {
    getCustomersData();
    getStatusData();
  }, [getCustomersData, getStatusData]);

  const memorizedCustomersOptions = useMemo(() => {
    if (customers) {
      return customers.map(customer => ({
        key: customer.id.toString(),
        value: `${customer.name.trim()} - ${customer.cpf}`,
      }));
    }
    return [];
  }, [customers]);

  // INFO -> create order body example
  //   {
  //     "date": "2023-06-20",
  //     "observation": "Não há observações",
  //     "description": "Esta é a descrição",
  //     "status": "pending",
  //     "customer_id": 1,
  //     "user_id": 1,
  //     "products": [
  //         {
  //             "id": 1,
  //             "quantity": 1
  //         }
  //     ]
  // }

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledSelect
        label="Cliente"
        name="customer"
        control={control}
        errorMessage={errors.customer?.message}
        options={memorizedCustomersOptions}
        placeHolder="Selecione um cliente"
        searchLabel="Pesquisar cliente"
        emptyLabel="Sem clientes cadastrados"
        isRequired
      />

      <ControlledInput
        id="description"
        label="Descrição"
        placeholder="Ex. Pedido de calças para..."
        register={register}
        errorMessage={errors.description?.message}
        isRequired
      />

      <ControlledInput
        id="observation"
        label="Observação"
        placeholder="Ex. A calça tem um bolso..."
        register={register}
        errorMessage={errors.observation?.message}
      />

      <MaskedInput
        id="date"
        label="Data do pedido"
        control={control}
        errorMessage={errors.date?.message}
        placeholder="Ex. 10/01/2019"
        mask="99/99/9999"
        isRequired
      />

      <ControlledSelect
        label="Status"
        name="status"
        control={control}
        errorMessage={errors.status?.message}
        options={status}
        placeHolder="Selecione um status"
        searchLabel="Pesquisar status"
        emptyLabel="Sem status cadastrados"
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
