'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

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
  Product,
  ProductFormProps,
  Supplier,
  SuppliersResponse,
} from './editProductForm.types';

const EditProductFormComponent = ({
  getProductFunction,
  handleCloseModal,
}: ProductFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined,
  );
  const [brands, setBrands] = useState<Brand[] | undefined>(undefined);
  const [suppliers, setSuppliers] = useState<Supplier[] | undefined>(undefined);

  useEffect(() => {
    const productData = getProductFunction();
    setProduct(productData);
  }, [getProductFunction]);

  const getBrands = useCallback(async () => {
    try {
      const { data: brandsResponse } = await api.get<BrandsResponse>(
        '/brands',
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setBrands(brandsResponse.data);
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
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
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
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
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
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
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o produto',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  if (
    !product ||
    memorizedBrandsOptions.length < 1 ||
    memorizedCategoriesOptions.length < 1
  ) {
    // TODO -> Add skeleton
    return <h1>Carregando...</h1>;
  }

  return (
    <form
      className="flex h-full w-full flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-5/6 w-full flex-col gap-4 overflow-y-auto sm:h-auto sm:max-h-[30rem]">
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
          // register={register}
          // errorMessage={errors.partNumber?.message}
          disabled
        />
        <ControlledInput
          defaultValue={product?.description}
          id="description"
          label="Descrição"
          register={register}
          errorMessage={errors.description?.message}
        />
        <ControlledInput
          defaultValue={product?.price}
          id="price"
          label="Preço"
          register={register}
          errorMessage={errors.price?.message}
          type="number"
        />
        <ControlledInput
          defaultValue={product?.size}
          id="size"
          label="Tamanho"
          register={register}
          errorMessage={errors.size?.message}
        />
        <ControlledInput
          defaultValue={product?.color}
          id="color"
          label="Cor"
          register={register}
          errorMessage={errors.color?.message}
        />
        <ControlledInput
          defaultValue={product?.quantity}
          id="quantity"
          label="Quantidade"
          register={register}
          errorMessage={errors.quantity?.message}
          type="number"
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
        />
      </div>
      <Button disabled={isSubmitting} type="submit" className=" sm:self-end">
        Alterar
      </Button>
    </form>
  );
};

export const EditProductForm = memo(EditProductFormComponent);
