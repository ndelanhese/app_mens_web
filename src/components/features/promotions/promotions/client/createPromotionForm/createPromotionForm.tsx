'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { MaskedInput } from '@components/ui/inputs/maskedInput';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PromotionFormSchema,
  promotionFormSchema,
} from './createPromotionForm.schema';
import {
  PromotionCategory,
  PromotionFormProps,
} from './createPromotionForm.types';
import { parseCookies } from 'nookies';
import { getCategories } from '../../api/apiData';

const CreatePromotionFormComponent = ({
  handleCloseModal,
}: PromotionFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [categories, setCategories] = useState<PromotionCategory[] | undefined>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<PromotionFormSchema>({
    resolver: zodResolver(promotionFormSchema),
  });

  const categoriesResponse = useCallback(async () => {
    const response = await getCategories();
    setCategories(response);
  }, []);

  useEffect(() => {
    categoriesResponse();
  }, [categoriesResponse]);

  const onSubmit: SubmitHandler<PromotionFormSchema> = async data => {
    try {
      await api.post(
        '/promotions',
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Promoção criada com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar a promoção',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const memoizedCategories = useMemo(
    () =>
      categories?.map(category => ({
        key: category.id.toString(),
        value: category.name,
      })),
    [categories],
  );

  return (
    <form
      className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        id="name"
        label="Nome"
        placeholder="Ex. Promoção de verão"
        register={register}
        errorMessage={errors.name?.message}
        isRequired
      />
      <ControlledInput
        id="description"
        label="Descrição"
        placeholder="Ex. Promoção de calçados de..."
        register={register}
        errorMessage={errors.name?.message}
        isRequired
      />
      <ControlledSelect
        label="Categoria"
        name="category"
        control={control}
        isRequired
        // errorMessage={errors.address?.state?.message}
        options={memoizedCategories}
        placeHolder="Selecione uma categoria"
        searchLabel="Pesquisar categoria"
        emptyLabel="Sem categorias cadastradas"
      />
      <MaskedInput
        id="initial_date"
        label="Data inicial"
        control={control}
        // errorMessage={errors.rg?.message}
        placeholder="Ex. 10/01/2019"
        mask="99/99/9999"
      />
      <MaskedInput
        id="final_date"
        label="Data final"
        control={control}
        // errorMessage={errors.rg?.message}
        placeholder="Ex. 11/01/2019"
        mask="99/99/9999"
      />
      <ControlledSelect
        label="Status"
        name="status"
        control={control}
        // errorMessage={errors.address?.state?.message}
        // TODO -> add status request
        options={memoizedCategories}
        placeHolder="Selecione um status"
        searchLabel="Pesquisar status"
        emptyLabel="Sem status cadastrados"
      />
      <MaskedInput
        id="discount_amount"
        label="Valor do desconto"
        control={control}
        // errorMessage={errors.rg?.message}
        placeholder="Ex. 10"
        // TODO -> add validation to percentage and amount
        mask="999.999,99"
      />
      <ControlledSelect
        label="Tipo de desconto"
        name="discount_type"
        control={control}
        // errorMessage={errors.address?.state?.message}
        // TODO -> add status request
        options={memoizedCategories}
        placeHolder="Selecione o tipo de desconto"
        searchLabel="Pesquisar tipo de desconto"
        emptyLabel="Sem resultados"
      />

      {/* TODO -> add products */}
      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Criar promoção
      </Button>
    </form>
  );
};

export const CreatePromotionForm = memo(CreatePromotionFormComponent);
