'use client';

import { api } from '@axios';
import { CreateCategoryForm } from '@components/features/promotions/promotionCategories/client/createPromotionCategoryForm/createCategoryForm';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { FormGridSkeleton } from '@components/shared/formGridSkeleton';
import { SearchProductModal } from '@components/shared/searchProductModal/searchProductModal';
import { AlertDialog } from '@components/ui/alertDialog/alertDialog';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';
import { zodResolver } from '@hookform/resolvers/zod';
import { convertDateFormat } from '@utils/helpers/date';
import { Trash } from 'lucide-react';
import { nanoid } from 'nanoid';
import { parseCookies } from 'nookies';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { DataTable } from '@/components/shared/dataTable';
import { RefModalProps } from '@/components/shared/table/table.types';
import { MaskedInput } from '@/components/ui/inputs/maskedInput';
import { NumberInput } from '@/components/ui/inputs/numberInput';
import { ControlledSelect } from '@/components/ui/selects/controlledSelect';
import { TableCell, TableRow } from '@/components/ui/shadcn/table';

import { getCategories, getDiscountType, getStatus } from '../../api/apiData';
import {
  DiscountType,
  DiscountTypeEnum,
  Status,
} from '../../api/apiData.types';
import {
  PromotionFormSchema,
  promotionFormSchema,
} from './editPromotionForm.schema';
import {
  CreatableSelects,
  NewItemModal,
  ProductSelectTable,
  ProductTable,
  PromotionCategory,
  PromotionFormProps,
} from './editPromotionForm.types';

const EditPromotionFormComponent = ({
  promotion,
  handleCloseModal,
}: PromotionFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const createItemModalRef = useRef<RefModalProps | null>(null);
  const [newItemModal, setNewItemModal] = useState<NewItemModal | undefined>(
    undefined,
  );

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
  const [products, setProducts] = useState<ProductTable[] | undefined>(
    undefined,
  );
  const [defaultDiscountValue, setDefaultDiscountValue] = useState<
    string | undefined
  >(promotion?.discount);

  useEffect(() => {
    if (promotion) {
      setDefaultDiscountValue(promotion.discount);
    }
  }, [promotion]);

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
    setFocus,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PromotionFormSchema>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      description: promotion?.description,
      initial_date: promotion?.initialDate,
      final_date: promotion?.finalDate,
      discount_amount: promotion?.discount_amount,
    },
  });

  useEffect(() => {
    if (watch('discount_type')) {
      setDiscountTypeSelected(watch('discount_type').value as DiscountTypeEnum);
    }
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

  const memoizedCategories = useMemo(
    () =>
      categories?.map(category => ({
        value: category.id.toString(),
        label: category.name,
      })),
    [categories],
  );

  useEffect(() => {
    if (memoizedCategories && status && discountType) {
      const promotionDiscountType = promotion?.discount.startsWith('R$')
        ? 'fixed'
        : 'percentage';

      setDiscountTypeSelected(promotionDiscountType);
    }
  }, [memoizedCategories, discountType, status, setValue, promotion]);

  useEffect(() => {
    const promotionProducts: ProductTable[] | undefined =
      promotion?.products?.map(promotion => ({
        id: promotion.id,
        name: promotion.name,
        part_number: promotion.part_number,
      }));
    setProducts(promotionProducts);
  }, [promotion?.products]);

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
      const {
        discount_type: discountType,
        final_date: finalDate,
        initial_date: initialDate,
        ...rest
      } = data;
      await api.put(
        `/promotions/${promotion?.id}`,
        {
          ...rest,
          products: selectedProducts,
          discount_type: discountType?.value,
          final_date: convertDateFormat(finalDate),
          initial_date: convertDateFormat(initialDate),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleCloseModal();
      toast({
        title: 'Promoção atualizada com sucesso',
        variant: 'default',
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar a promoção',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleCloseSelectProductModal = useCallback(() => {
    selectProductModalRef.current?.close();
  }, []);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const handleRowClick = useCallback((row: ProductSelectTable) => {
    setProducts(prev => {
      const newProduct: ProductTable = {
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

  useEffect(() => {
    if (watch('discount_type')) {
      setDefaultDiscountValue(undefined);
      setValue('discount_amount', null);
    }
  }, [watch('discount_type')]);

  const handleCloseNewItemModal = useCallback(async () => {
    await getCategoriesData();

    setNewItemModal(undefined);
    createItemModalRef.current?.close();
  }, [getCategoriesData]);

  useEffect(() => {
    if (newItemModal) {
      createItemModalRef.current?.open();
    }
  }, [newItemModal]);

  const newItemCallbackFunction = useCallback(
    async (inputName: string) => {
      setNewItemModal({
        newItemDialogContent: (
          <CreateCategoryForm
            handleCloseModal={async () => {
              await handleCloseNewItemModal();
            }}
          />
        ),
        newItemDialogDescription:
          'Criar nova categoria de promoção no sistema.',
        newItemDialogRef: ref => {
          createItemModalRef.current = ref;
        },
        newItemDialogTitle: 'Criar nova categoria de promoção',
        newItemName: inputName as CreatableSelects,
      });
    },
    [handleCloseNewItemModal],
  );

  const isLoading =
    !memoizedCategories || !discountType || !status || !promotion;

  if (isLoading) {
    return <FormGridSkeleton qtyOfInputs={10} />;
  }

  return (
    <FormGrid
      onSubmit={handleSubmit(onSubmit)}
      newItemDialogContent={newItemModal?.newItemDialogContent}
      newItemDialogDescription={newItemModal?.newItemDialogDescription}
      newItemDialogTitle={newItemModal?.newItemDialogTitle}
      newItemDialogRef={newItemModal?.newItemDialogRef}
    >
      <ControlledInput value={promotion?.id} id="id" label="Código" readOnly />
      <ControlledInput
        id="name"
        label="Promoção de verão"
        register={register}
        errorMessage={errors.name?.message}
        defaultValue={promotion?.name}
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
      {memoizedCategories && (
        <ControlledSelect
          label="Categoria"
          name="promotion_category_id"
          control={control}
          isRequired
          errorMessage={errors.promotion_category_id?.message}
          options={memoizedCategories}
          defaultValue={promotion?.category}
          placeHolder="Selecione uma categoria"
          searchLabel="Pesquisar categoria"
          emptyLabel="Sem categorias cadastradas"
          newItemLabel="Criar uma nova categoria?"
          newItemCallbackFunction={newItemCallbackFunction}
          menuPosition="bottom"
        />
      )}
      <MaskedInput
        id="initial_date"
        label="Data inicial"
        control={control}
        errorMessage={errors.initial_date?.message}
        placeholder="Ex. 10/01/2019"
        mask="99/99/9999"
        isRequired
        inputMode="numeric"
      />
      <MaskedInput
        id="final_date"
        label="Data final"
        control={control}
        errorMessage={errors.final_date?.message}
        placeholder="Ex. 11/01/2019"
        mask="99/99/9999"
        isRequired
        inputMode="numeric"
      />
      {status && (
        <ControlledSelect
          label="Status"
          name="status"
          control={control}
          errorMessage={errors.status?.message}
          options={status}
          defaultValue={promotion?.status}
          placeHolder="Selecione um status"
          searchLabel="Pesquisar status"
          emptyLabel="Sem status cadastrados"
        />
      )}
      {discountType && discountTypeSelected && (
        <ControlledSelect
          label="Tipo de desconto"
          name="discount_type"
          control={control}
          errorMessage={errors.discount_type?.message}
          options={discountType}
          defaultValue={discountTypeSelected}
          placeHolder="Selecione o tipo de desconto"
          searchLabel="Pesquisar tipo de desconto"
          emptyLabel="Sem resultados"
          isRequired
          isClearable={false}
        />
      )}

      {discountTypeSelected && (
        <NumberInput
          id="discount_amount"
          label="Valor do desconto"
          control={control}
          errorMessage={errors.discount_amount?.message}
          placeholder={
            discountTypeSelected === 'percentage' ? 'Ex. 10%' : 'Ex. R$ 50,99'
          }
          defaultValue={defaultDiscountValue}
          disabled={!discountTypeSelected}
          mask={discountTypeSelected === 'percentage' ? 'percentage' : 'money'}
          prefix={discountTypeSelected === 'fixed' ? 'R$' : undefined}
          isRequired
          inputMode="numeric"
        />
      )}
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
        Editar
      </Button>
    </FormGrid>
  );
};

export const EditPromotionForm = memo(EditPromotionFormComponent);
