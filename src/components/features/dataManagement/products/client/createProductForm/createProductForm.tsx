'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';
import { ControlledSelect } from '@/components/ui/selects/controlledSelect';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
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
  ProductFormProps,
  Supplier,
  SuppliersResponse,
} from './createProductForm.types';
import { parseCookies } from 'nookies';

const CreateProductFormComponent = ({ handleCloseModal }: ProductFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

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
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o produto',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-6 overflow-y-auto sm:max-h-[30rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        id="name"
        label="Nome"
        register={register}
        errorMessage={errors.name?.message}
        placeholder="Nome do produto"
      />
      <ControlledInput
        id="description"
        label="Descrição"
        register={register}
        errorMessage={errors.description?.message}
        placeholder="Descrição do produto"
      />
      <ControlledInput
        id="price"
        label="Preço"
        register={register}
        errorMessage={errors.price?.message}
        placeholder="Preço do produto"
        type="number"
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
      />
      <ControlledSelect
        label="Categoria"
        name="category"
        control={control}
        errorMessage={errors.category?.message}
        options={memorizedCategoriesOptions}
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
        placeHolder="Selecione um fornecedor"
        searchLabel="Pesquisar fornecedor"
        emptyLabel="Sem fornecedores cadastradas"
      />

      <Button disabled={isSubmitting} type="submit" className="sm:self-end">
        Criar
      </Button>
    </form>
  );
};

export const CreateProductForm = memo(CreateProductFormComponent);
