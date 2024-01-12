'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { NumberInput } from '@components/ui/inputs/numberInput';
import { RefModalProps } from '@components/shared/table/table.types';
import { CreateBrandForm } from '@components/features/dataManagement/brands/client/createBrandForm/createBrandForm';
import { CreateCategoryForm } from '@components/features/dataManagement/categories/client/createCategoryForm/createCategoryForm';
import { CreateSupplierForm } from '@components/features/employees/suppliers/client/createSupplierForm/createSupplierForm';

import { formatMoneyByCurrencySymbol } from '@utils/helpers';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductFormSchema, productFormSchema } from './editProductForm.schema';
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
} from './editProductForm.types';

const EditProductFormComponent = ({
  handleCloseModal,
  product,
}: ProductFormProps) => {
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
    setFocus,
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
      await api.put(`/products/${product?.id}`, params, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Produto atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o produto',
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

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  if (
    !product ||
    memorizedBrandsOptions.length < 1 ||
    memorizedCategoriesOptions.length < 1 ||
    memorizedSuppliersOptions.length < 1
  ) {
    // TODO -> Add skeleton
    return <h1>Carregando...</h1>;
  }

  return (
    <FormGrid
      onSubmit={handleSubmit(onSubmit)}
      newItemDialogContent={newItemModal?.newItemDialogContent}
      newItemDialogDescription={newItemModal?.newItemDialogDescription}
      newItemDialogTitle={newItemModal?.newItemDialogTitle}
      newItemDialogRef={newItemModal?.newItemDialogRef}
    >
      <ControlledInput value={product?.id} id="id" label="Código" readOnly />
      <ControlledInput
        defaultValue={product?.name}
        id="name"
        label="Nome"
        register={register}
        errorMessage={errors.name?.message}
      />
      <ControlledInput
        defaultValue={product?.partNumber}
        id="partNumber"
        label="Part Number"
        readOnly
      />
      <ControlledInput
        defaultValue={product?.description}
        id="description"
        label="Descrição"
        register={register}
        errorMessage={errors.description?.message}
        isRequired
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
        defaultValue={formatMoneyByCurrencySymbol(product?.price)}
      />

      {product?.final_price && (
        <ControlledInput
          value={product?.final_price}
          id="final_price"
          label="Preço com desconto"
          readOnly
        />
      )}

      <ControlledInput
        defaultValue={product?.size}
        id="size"
        label="Tamanho"
        register={register}
        errorMessage={errors.size?.message}
        placeholder="Tamanho do produto"
      />
      <ControlledInput
        defaultValue={product?.color}
        id="color"
        label="Cor"
        register={register}
        errorMessage={errors.color?.message}
        placeholder="Cor do produto"
      />
      <ControlledInput
        defaultValue={product?.quantity}
        id="quantity"
        label="Quantidade"
        register={register}
        errorMessage={errors.quantity?.message}
        type="number"
        min={0}
      />
      <ControlledSelect
        label="Categoria"
        name="category"
        control={control}
        errorMessage={errors.category?.message}
        options={memorizedCategoriesOptions}
        defaultValue={product?.category.id.toString()}
        placeHolder="Selecione uma categoria"
        searchLabel="Pesquisar categoria"
        emptyLabel="Sem categorias cadastradas"
        newItemLabel="Criar uma nova categoria?"
        newItemCallbackFunction={newItemCallbackFunction}
      />
      <ControlledSelect
        label="Marca"
        name="brand"
        control={control}
        errorMessage={errors.brand?.message}
        options={memorizedBrandsOptions}
        defaultValue={product?.brand.id.toString()}
        placeHolder="Selecione uma marca"
        searchLabel="Pesquisar marca"
        emptyLabel="Sem marcas cadastradas"
        newItemLabel="Criar uma nova marca?"
        newItemCallbackFunction={newItemCallbackFunction}
      />
      <ControlledSelect
        label="Fornecer"
        name="supplier"
        control={control}
        errorMessage={errors.supplier?.message}
        options={memorizedSuppliersOptions}
        defaultValue={product?.supplier.id.toString()}
        placeHolder="Selecione um fornecedor"
        searchLabel="Pesquisar fornecedor"
        emptyLabel="Sem fornecedores cadastradas"
        newItemLabel="Criar um novo fornecedor?"
        newItemCallbackFunction={newItemCallbackFunction}
      />
      <Button
        disabled={isSubmitting}
        type="submit"
        className="h-fit self-end sm:col-start-2"
      >
        Alterar Produto
      </Button>
    </FormGrid>
  );
};

export const EditProductForm = memo(EditProductFormComponent);
