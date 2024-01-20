'use client';

import { api } from '@axios';
import { CreateBrandForm } from '@components/features/dataManagement/brands/client/createBrandForm/createBrandForm';
import { CreateCategoryForm } from '@components/features/dataManagement/categories/client/createCategoryForm/createCategoryForm';
import { CreateSupplierForm } from '@components/features/employees/suppliers/client/createSupplierForm/createSupplierForm';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { FormGridSkeleton } from '@components/shared/formGridSkeleton';
import { RefModalProps } from '@components/shared/table/table.types';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { NumberInput } from '@components/ui/inputs/numberInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  ProductFormSchema,
  productFormSchema,
} from './createProductForm.schema';
import {
  Brand,
  BrandsResponse,
  CategoriesResponse,
  Category,
  ComboboxOption,
  CreatableSelects,
  NewItemModal,
  ProductFormProps,
  Supplier,
  SuppliersResponse,
} from './createProductForm.types';

const CreateProductFormComponent = ({ handleCloseModal }: ProductFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const createItemModalRef = useRef<RefModalProps | null>(null);
  const [newItemModal, setNewItemModal] = useState<NewItemModal | undefined>(
    undefined,
  );

  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined,
  );
  const [brands, setBrands] = useState<Brand[] | undefined>(undefined);
  const [suppliers, setSuppliers] = useState<Supplier[] | undefined>(undefined);

  const getBrands = useCallback(async () => {
    try {
      const { data: brandsResponse } = await api.get<BrandsResponse>(
        '/brands',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setBrands(brandsResponse.data);
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao buscar marcas',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast, token]);

  const getCategories = useCallback(async () => {
    try {
      const { data: categoriesResponse } = await api.get<CategoriesResponse>(
        '/categories',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCategories(categoriesResponse.data);
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao buscar categorias',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast, token]);

  const getSuppliers = useCallback(async () => {
    try {
      const { data: suppliersResponse } = await api.get<SuppliersResponse>(
        '/suppliers',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSuppliers(suppliersResponse.data);
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao buscar fornecedores',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast, token]);

  useEffect(() => {
    getBrands();
    getCategories();
    getSuppliers();
  }, [getBrands, getCategories, getSuppliers]);

  function convertToComboboxOptions<T>(
    data: T[],
    idKey: keyof T,
    labelKey: keyof T,
  ): ComboboxOption[] {
    return data.map(item => ({
      value: String(item[idKey]),
      label: String(item[labelKey]),
    }));
  }
  const memorizedBrandsOptions = useMemo(() => {
    if (brands) {
      return convertToComboboxOptions(brands, 'id', 'name');
    }
    return [];
  }, [brands]);

  const memorizedCategoriesOptions = useMemo(() => {
    if (categories) {
      return convertToComboboxOptions(categories, 'id', 'name');
    }
    return [];
  }, [categories]);

  const memorizedSuppliersOptions = useMemo(() => {
    if (suppliers) {
      return convertToComboboxOptions(suppliers, 'id', 'corporate_name');
    }
    return [];
  }, [suppliers]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit: SubmitHandler<ProductFormSchema> = async data => {
    const { category, brand, supplier, ...oldParams } = data;
    const params = {
      ...oldParams,
      category_id: Number(category),
      brand_id: Number(brand),
      supplier_id: Number(supplier),
    };

    try {
      await api.post(
        '/products',
        { ...params },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Produto criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o produto',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleCloseNewItemModal = useCallback(async () => {
    await getCategories();
    await getBrands();
    await getSuppliers();
    setNewItemModal(undefined);
    createItemModalRef.current?.close();
  }, [getBrands, getCategories, getSuppliers]);

  useEffect(() => {
    if (newItemModal) {
      createItemModalRef.current?.open();
    }
  }, [newItemModal]);

  const newItemCallbackFunction = useCallback(
    async (inputName: string) => {
      switch (inputName as CreatableSelects) {
        case 'category':
          setNewItemModal({
            newItemDialogContent: (
              <CreateCategoryForm
                handleCloseModal={async () => {
                  await handleCloseNewItemModal();
                }}
              />
            ),
            newItemDialogDescription: 'Criar nova categoria no sistema.',
            newItemDialogRef: ref => {
              createItemModalRef.current = ref;
            },
            newItemDialogTitle: 'Criar nova categoria',
            newItemName: inputName as CreatableSelects,
          });
          break;
        case 'brand':
          setNewItemModal({
            newItemDialogContent: (
              <CreateBrandForm
                handleCloseModal={async () => {
                  await handleCloseNewItemModal();
                }}
              />
            ),
            newItemDialogDescription: 'Criar nova marca no sistema.',
            newItemDialogRef: ref => {
              createItemModalRef.current = ref;
            },
            newItemDialogTitle: 'Criar nova marca',
            newItemName: inputName as CreatableSelects,
          });
          break;
        case 'supplier':
          setNewItemModal({
            newItemDialogContent: (
              <CreateSupplierForm
                handleCloseModal={async () => {
                  await handleCloseNewItemModal();
                }}
              />
            ),
            newItemDialogDescription: 'Criar novo fornecedor no sistema.',
            newItemDialogRef: ref => {
              createItemModalRef.current = ref;
            },
            newItemDialogTitle: 'Criar novo fornecedor',
            newItemName: inputName as CreatableSelects,
          });
          break;
      }
    },
    [handleCloseNewItemModal],
  );

  const isLoading =
    !memorizedCategoriesOptions ||
    !memorizedBrandsOptions ||
    !memorizedSuppliersOptions;

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
      <ControlledInput
        id="name"
        label="Nome"
        register={register}
        errorMessage={errors.name?.message}
        placeholder="Nome do produto"
        isRequired
      />
      <ControlledInput
        id="description"
        label="Descrição"
        register={register}
        errorMessage={errors.description?.message}
        placeholder="Descrição do produto"
        isRequired
      />
      <NumberInput
        id="purchase_price"
        label="Preço de compra"
        control={control}
        errorMessage={errors.purchase_price?.message}
        placeholder="Preço de compra produto"
        mask={'money'}
        prefix="R$"
        inputMode="decimal"
        type="number"
      />
      <NumberInput
        id="price"
        label="Preço"
        control={control}
        errorMessage={errors.price?.message}
        placeholder="Preço do produto"
        mask={'money'}
        prefix="R$"
        inputMode="decimal"
        type="number"
        isRequired
      />
      <ControlledInput
        id="size"
        label="Tamanho"
        register={register}
        errorMessage={errors.size?.message}
        placeholder="Tamanho do produto"
      />
      <ControlledInput
        id="color"
        label="Cor"
        register={register}
        errorMessage={errors.color?.message}
        placeholder="Cor do produto"
      />
      <ControlledInput
        id="quantity"
        label="Quantidade"
        register={register}
        errorMessage={errors.quantity?.message}
        placeholder="Quantidade do produto"
        type="number"
        inputMode="numeric"
        isRequired
        min={0}
      />
      {memorizedCategoriesOptions && (
        <ControlledSelect
          label="Categoria"
          name="category"
          control={control}
          errorMessage={errors.category?.message}
          options={memorizedCategoriesOptions}
          placeHolder="Selecione uma categoria"
          searchLabel="Pesquisar categoria"
          emptyLabel="Sem categorias cadastradas"
          isRequired
          newItemLabel="Criar uma nova categoria?"
          newItemCallbackFunction={newItemCallbackFunction}
        />
      )}
      {memorizedBrandsOptions && (
        <ControlledSelect
          label="Marca"
          name="brand"
          control={control}
          errorMessage={errors.brand?.message}
          options={memorizedBrandsOptions}
          placeHolder="Selecione uma marca"
          searchLabel="Pesquisar marca"
          emptyLabel="Sem marcas cadastradas"
          isRequired
          newItemLabel="Criar uma nova marca?"
          newItemCallbackFunction={newItemCallbackFunction}
        />
      )}
      {memorizedSuppliersOptions && (
        <ControlledSelect
          label="Fornecer"
          name="supplier"
          control={control}
          errorMessage={errors.supplier?.message}
          options={memorizedSuppliersOptions}
          placeHolder="Selecione um fornecedor"
          searchLabel="Pesquisar fornecedor"
          emptyLabel="Sem fornecedores cadastradas"
          isRequired
          newItemLabel="Criar um novo fornecedor?"
          newItemCallbackFunction={newItemCallbackFunction}
        />
      )}

      <Button disabled={isSubmitting} type="submit" className="sm:col-start-2">
        Criar Produto
      </Button>
    </FormGrid>
  );
};

export const CreateProductForm = memo(CreateProductFormComponent);
