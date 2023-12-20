'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DataTable } from '@/components/shared/dataTable';
import { RefModalProps } from '@/components/shared/table/table.types';
import { TableCell, TableRow } from '@/components/ui/shadcn/table';
import { currentDateString, getNextDay } from '@/utils/helpers/date';
import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { NumberInput } from '@components/ui/inputs/numberInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { AlertDialog } from '@components/ui/alertDialog/alertDialog';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';

import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCategories, getDiscountType, getStatus } from '../../api/apiData';
import {
  DiscountType,
  DiscountTypeEnum,
  Status,
} from '../../api/apiData.types';
import { SearchProductModal } from '../searchProductModal/searchProductModal';
import {
  PromotionFormSchema,
  promotionFormSchema,
} from './createPromotionForm.schema';
import {
  Product,
  ProductTable,
  PromotionCategory,
  PromotionFormProps,
} from './createPromotionForm.types';
import { Trash } from 'lucide-react';

const CreatePromotionFormComponent = ({
  handleCloseModal,
}: PromotionFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const selectProductModalRef = useRef<RefModalProps | null>(null);

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

  const columns = ['Código', 'Nome', 'Part Number', ''];

  const DELETE_ITEM_TRIGGER = (
    <StyledDiv>
      <Trash className="h-4 w-4" />
    </StyledDiv>
  );

  const handleRemoveItemFromProducts = useCallback(
    (idToRemove: number) => {
      if (products) {
        const updatedProducts = products.filter(
          product => product.id !== idToRemove,
        );
        setProducts(updatedProducts);
      }
    },
    [products],
  );

  const productsData = products?.map(product => (
    <TableRow key={nanoid()}>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.part_number}</TableCell>
      <TableCell>
        <AlertDialog
          actionLabel="Confirmar"
          cancelLabel="Cancelar"
          description={'Você tem certeza que deseja remover este produto?'}
          onAction={() => {
            handleRemoveItemFromProducts(product.id);
          }}
          title={'Excluir'}
          trigger={DELETE_ITEM_TRIGGER}
        />
      </TableCell>
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
    defaultValues: {
      initial_date: currentDateString(),
      final_date: getNextDay(),
    },
  });

  useEffect(() => {
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
      if (!products || (products && products?.length < 1)) {
        toast({
          title: 'Erro ao criar promoção',
          description: 'Adicione ao menos um produto.',
          variant: 'destructive',
        });
        selectProductModalRef.current?.open();
        return;
      }
      const selectedProducts = products.map(product => ({ id: product.id }));
      await api.post(
        '/promotions',
        { ...data, products: selectedProducts },
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

  const handleCloseSelectProductModal = useCallback(() => {
    selectProductModalRef.current?.close();
  }, []);

  const handleRowClick = useCallback((row: ProductTable) => {
    setProducts(prev => {
      const newProduct: Product = {
        id: row.id,
        name: row.name,
        part_number: row.partNumber,
      };

      const existingIds = new Set(prev?.map(product => product.id));

      if (existingIds.has(newProduct.id)) {
        return prev;
      }

      return prev ? [...prev, newProduct] : [newProduct];
    });
  }, []);

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
        name="promotion_category_id"
        control={control}
        isRequired
        errorMessage={errors.promotion_category_id?.message}
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
        isRequired
      />
      <MaskedInput
        id="final_date"
        label="Data final"
        control={control}
        errorMessage={errors.final_date?.message}
        placeholder="Ex. 11/01/2019"
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
        isRequired
      />
      <NumberInput
        id="discount_amount"
        label="Valor do desconto"
        control={control}
        errorMessage={errors.discount_amount?.message}
        placeholder={
          discountTypeSelected === 'percentage' ? 'Ex. 10%' : 'Ex. R$ 50,99'
        }
        disabled={!discountTypeSelected}
        mask={discountTypeSelected === 'percentage' ? 'percentage' : 'money'}
        prefix={discountTypeSelected === 'fixed' ? 'R$' : undefined}
        isRequired
      />

      <div className="col-start-1 col-end-2 flex flex-col items-center justify-between sm:col-end-3 sm:flex-row">
        <h1 className="mb-2 text-black-80 dark:text-white-80 sm:mb-0">
          Produtos
        </h1>
        <SearchProductModal
          handleRowClick={handleRowClick}
          handleCloseModal={handleCloseSelectProductModal}
          modalRef={ref => {
            selectProductModalRef.current = ref;
          }}
        />
      </div>
      <div className="col-start-1 col-end-2 h-px bg-neutral-600 dark:bg-black-80 sm:col-end-3" />

      <div className="col-start-1 col-end-2 sm:col-end-3">
        <DataTable
          columns={columns}
          emptyMessage="Nenhum produto para essa promoção."
        >
          {productsData}
        </DataTable>
      </div>
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
