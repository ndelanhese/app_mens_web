'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';
import { DataTable } from '@/components/shared/dataTable';
import { TableCell, TableRow } from '@/components/ui/shadcn/table';

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
  Product,
  PromotionCategory,
  PromotionFormProps,
} from './createPromotionForm.types';
import { parseCookies } from 'nookies';
import { getCategories, getDiscountType, getStatus } from '../../api/apiData';
import {
  DiscountType,
  DiscountTypeEnum,
  Status,
} from '../../api/apiData.types';
import { nanoid } from 'nanoid';

const CreatePromotionFormComponent = ({
  handleCloseModal,
}: PromotionFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [categories, setCategories] = useState<PromotionCategory[] | undefined>(
    undefined,
  );
  const [status, setStatus] = useState<Status[] | undefined>(undefined);
  const [discountType, setDiscountType] = useState<DiscountType[] | undefined>(
    undefined,
  );
  const [discountTypeSelected, setDiscountTypeSelected] = useState<
    DiscountTypeEnum | undefined
  >('percentage');
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const columns = ['Código', 'Nome', 'Part Number'];

  const productsData = products?.map(product => (
    <TableRow key={nanoid()}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.part_number}</TableCell>
    </TableRow>
  ));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<PromotionFormSchema>({
    resolver: zodResolver(promotionFormSchema),
  });

  useEffect(() => {
    console.log(watch('discount_type'));
    setDiscountTypeSelected(watch('discount_type') as DiscountTypeEnum);
  }, [watch('discount_type')]);

  const getCategoriesData = useCallback(async () => {
    const response = await getCategories();
    setCategories(response);
  }, []);

  const getStatusData = useCallback(async () => {
    const response = await getStatus();
    setStatus(response);
  }, []);

  const getDiscountTypeData = useCallback(async () => {
    const response = await getDiscountType();
    setDiscountType(response);
  }, []);

  useEffect(() => {
    getCategoriesData();
    getStatusData();
    getDiscountTypeData();
  }, [getCategoriesData, getDiscountTypeData, getStatusData]);

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
        errorMessage={errors.description?.message}
        isRequired
      />
      <ControlledSelect
        label="Categoria"
        name="category"
        control={control}
        isRequired
        errorMessage={errors.category?.message}
        options={memoizedCategories}
        placeHolder="Selecione uma categoria"
        searchLabel="Pesquisar categoria"
        emptyLabel="Sem categorias cadastradas"
      />
      <MaskedInput
        id="initial_date"
        label="Data inicial"
        control={control}
        errorMessage={errors.initial_date?.message}
        placeholder="Ex. 10/01/2019"
        mask="99/99/9999"
      />
      <MaskedInput
        id="final_date"
        label="Data final"
        control={control}
        errorMessage={errors.final_date?.message}
        placeholder="Ex. 11/01/2019"
        mask="99/99/9999"
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
      <ControlledSelect
        label="Tipo de desconto"
        name="discount_type"
        control={control}
        errorMessage={errors.discount_type?.message}
        options={discountType}
        defaultValue="percentage"
        placeHolder="Selecione o tipo de desconto"
        searchLabel="Pesquisar tipo de desconto"
        emptyLabel="Sem resultados"
      />
      <MaskedInput
        id="discount_amount"
        label="Valor do desconto"
        control={control}
        errorMessage={errors.discount_amount?.message}
        placeholder={
          discountTypeSelected === 'percentage' ? 'Ex. 10%' : 'Ex. R$ 50,99'
        }
        disabled={!discountTypeSelected}
        mask={discountTypeSelected === 'percentage' ? '99%' : '999.999,99'}
      />

      <h1 className="text-black-80 dark:text-white-80 ">Produtos</h1>
      <div className="col-start-1 col-end-3 h-px bg-neutral-600 dark:bg-black-80" />

      <div className="col-start-1 col-end-3">
        <DataTable
          columns={columns}
          emptyMessage="Nenhum produto para essa promoção."
        >
          {productsData}
        </DataTable>
      </div>
      {/* TODO -> add products find */}
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
