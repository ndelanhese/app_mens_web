'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { ControlledSelect } from '@/components/ui/selects/controlledSelect';
import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { MaskedInput } from '@components/ui/inputs/maskedInput';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  SupplierFormSchema,
  supplierFormSchema,
} from './createSupplierForm.schema';
import {
  CityResponse,
  SupplierFormProps,
  StateResponse,
} from './createSupplierForm.types';
import { getCities, getStates } from '../../api/apiData';

const CreateSupplierFormComponent = ({
  handleCloseModal,
}: SupplierFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [states, setStates] = useState<StateResponse[] | undefined>(undefined);
  const [cities, setCities] = useState<CityResponse[] | undefined>(undefined);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SupplierFormSchema>({
    resolver: zodResolver(supplierFormSchema),
  });

  const stateResponse = useCallback(async () => {
    const response = await getStates();
    setStates(response);
  }, []);

  const handleSelectState = useCallback(async () => {
    const state = watch('address.state');
    if (state) {
      const response = await getCities(state);
      setCities(response);
      setValue('address.city', '');
    }
  }, [setValue, watch]);

  useEffect(() => {
    stateResponse();
  }, [stateResponse]);

  useEffect(() => {
    if (watch('address.state')) {
      handleSelectState();
      setValue('address.city', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSelectState, watch('address.state')]);

  const convertCitiesToComboboxOptions = (data: CityResponse[]) => {
    return data.map(item => ({
      key: convertStringToSlug(
        item.isMunicipality ? item.name : item.name_with_municipality,
      ),
      value: item.isMunicipality ? item.name : item.name_with_municipality,
    }));
  };

  const memorizedStates = useMemo(() => {
    if (states) {
      return states;
    }
    return [];
  }, [states]);

  const memorizedCities = useMemo(() => {
    if (cities) {
      return convertCitiesToComboboxOptions(cities);
    }
    return [];
  }, [cities]);

  const onSubmit: SubmitHandler<SupplierFormSchema> = async data => {
    try {
      const { address, ...restData } = data;
      const { state, city, ...restAddress } = address;
      const stateValue = memorizedStates.find(item => item.key === state)
        ?.value;
      const cityValue = memorizedCities.find(item => item.key === city)?.value;

      const newSupplier = {
        ...restData,
        address: {
          ...restAddress,
          state: stateValue,
          city: cityValue,
        },
      };

      await api.post(
        '/suppliers',
        { ...newSupplier },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Fornecedor criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o fornecedor',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledInput
        id="contact_name"
        label="Nome do contato"
        isRequired
        register={register}
        errorMessage={errors.contact_name?.message}
        placeholder="Ex. João da Silva"
      />
      <ControlledInput
        id="corporate_name"
        label="Nome do fornecedor"
        isRequired
        register={register}
        errorMessage={errors.corporate_name?.message}
        placeholder="Ex. João da Silva ltda."
      />
      <MaskedInput
        id="cnpj"
        label="CNPJ"
        isRequired
        control={control}
        errorMessage={errors.cnpj?.message}
        placeholder="Ex. 12.345.678/9012-34"
        mask="99.999.999/9999-99"
      />
      <ControlledInput
        id="address.address"
        label="Endereço"
        isRequired
        register={register}
        errorMessage={errors.address?.address?.message}
        placeholder="Ex. Rua de casa"
      />
      <ControlledInput
        id="address.number"
        label="Número"
        isRequired
        register={register}
        errorMessage={errors.address?.number?.message}
        placeholder="Ex. 123A"
      />
      <ControlledInput
        id="address.district"
        label="Bairro"
        isRequired
        register={register}
        errorMessage={errors.address?.district?.message}
        placeholder="Ex. Centro"
      />
      <MaskedInput
        id="address.postal_code"
        label="CEP"
        isRequired
        control={control}
        errorMessage={errors.address?.postal_code?.message}
        placeholder="Ex. 12345-678"
        mask="99999-999"
      />
      <ControlledSelect
        label="Estado"
        name="address.state"
        control={control}
        isRequired
        errorMessage={errors.address?.state?.message}
        options={memorizedStates}
        placeHolder="Selecione um estado"
        searchLabel="Pesquisar estado"
        emptyLabel="Sem estados cadastrados"
      />
      <ControlledSelect
        label="Cidade"
        name="address.city"
        control={control}
        isRequired
        errorMessage={errors.address?.city?.message}
        options={memorizedCities}
        placeHolder="Selecione uma cidade"
        searchLabel="Pesquisar cidade"
        emptyLabel="Sem cidades cadastrados"
      />
      <Button
        isLoading={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Criar novo fornecedor
      </Button>
    </form>
  );
};

export const CreateSupplierForm = memo(CreateSupplierFormComponent);
