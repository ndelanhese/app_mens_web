'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import {
  ViacepResponseData,
  PostalCodeInput,
} from '@components/ui/inputs/postalCodeInput';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCities, getStates } from '../../api/apiData';
import {
  SupplierFormSchema,
  supplierFormSchema,
} from './editSupplierForm.schema';
import {
  CityResponse,
  SupplierFormProps,
  StateResponse,
} from './editSupplierForm.types';

const EditSupplierFormComponent = ({
  handleCloseModal,
  supplier,
}: SupplierFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [states, setStates] = useState<StateResponse[] | undefined>(undefined);
  const [cities, setCities] = useState<CityResponse[] | undefined>(undefined);
  const [isLoadingPostalCode, setIsLoadingPostalCode] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setFocus,
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
      const response = await getCities(state.value);
      setCities(response);
      setValue('address.city', null);
    }
  }, [setValue, watch]);

  useEffect(() => {
    stateResponse();
  }, [stateResponse]);

  useEffect(() => {
    if (watch('address.state')) {
      handleSelectState();
      setValue('address.city', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSelectState, watch('address.state')]);

  const convertCitiesToComboboxOptions = (data: CityResponse[]) => {
    return data.map(item => ({
      value: convertStringToSlug(
        item.is_municipality ? item.name : item.name_with_municipality,
      ),
      label: item.is_municipality ? item.name : item.name_with_municipality,
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
      const stateValue = memorizedStates.find(
        item => item.label === state.label,
      )?.label;
      const cityValue = memorizedCities.find(item => item.label === city?.label)
        ?.label;

      const newSupplier = {
        ...restData,
        address: {
          id: supplier?.addresses[0].id,
          ...restAddress,
          state: stateValue,
          city: cityValue,
        },
      };
      await api.put(`/suppliers/${supplier?.id}`, newSupplier, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Fornecedor atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o fornecedor',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleSearchCep = useCallback(
    async (data: Promise<ViacepResponseData>) => {
      try {
        setIsLoadingPostalCode(true);
        const response = await Promise.resolve(data);

        if (response.cep) {
          setValue('address.address', response.logradouro);
          setValue('address.district', response.bairro);
          const postalCodeState = memorizedStates?.find(
            state => state.value === response.uf,
          );
          if (postalCodeState) {
            setValue('address.state', postalCodeState);
          }

          const postalCodeCity = memorizedCities?.find(
            city => city.value === convertStringToSlug(response.localidade),
          );

          if (postalCodeCity) {
            await new Promise(resolve => setTimeout(resolve, 2500));
            setValue('address.city', postalCodeCity);
          }
          setIsLoadingPostalCode(false);
          response.logradouro
            ? setFocus('address.number')
            : setFocus('address.address');
        }
      } catch (error: Error | any) {
        setIsLoadingPostalCode(false);
        const errorMessage =
          error?.response?.data?.message ?? 'Erro desconhecido';
        toast({
          title: 'Erro ao buscar CEP',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    },
    [memorizedCities, memorizedStates, setFocus, setValue, toast],
  );

  if (!supplier || memorizedStates.length < 1) {
    // TODO -> Add skeleton
    return <h1>Carregando...</h1>;
  }

  return (
    <form
      className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {supplier && (
        <>
          <ControlledInput
            id="id"
            label="Código"
            defaultValue={supplier?.id}
            readOnly
          />
          <ControlledInput
            id="contact_name"
            label="Nome do contato"
            isRequired
            register={register}
            errorMessage={errors.contact_name?.message}
            defaultValue={supplier?.contactName}
            placeholder="Ex. João da Silva"
          />
          <ControlledInput
            id="corporate_name"
            label="Nome do fornecedor"
            isRequired
            register={register}
            errorMessage={errors.corporate_name?.message}
            defaultValue={supplier?.corporateName}
            placeholder="Ex. João da Silva ltda."
          />
          <MaskedInput
            id="cnpj"
            label="CNPJ"
            isRequired
            control={control}
            errorMessage={errors.cnpj?.message}
            defaultValue={supplier?.cnpj}
            placeholder="Ex. 12.345.678/9012-34"
            mask="99.999.999/9999-99"
          />
          <PostalCodeInput
            id="address.postal_code"
            label="CEP"
            isRequired
            control={control}
            errorMessage={errors.address?.postal_code?.message}
            placeholder="Ex. 12345-678"
            mask="99999-999"
            handleSearchCep={handleSearchCep}
            disabled={isLoadingPostalCode}
            defaultValue={supplier?.addresses?.[0]?.postalCode}
          />

          <ControlledInput
            id="address.address"
            label="Endereço"
            isRequired
            register={register}
            errorMessage={errors.address?.address?.message}
            defaultValue={supplier?.addresses?.[0]?.address}
            placeholder="Ex. Rua de casa"
            disabled={isLoadingPostalCode}
          />
          <ControlledInput
            id="address.number"
            label="Número"
            isRequired
            register={register}
            errorMessage={errors.address?.number?.message}
            defaultValue={supplier?.addresses?.[0]?.number}
            placeholder="Ex. 123A"
            disabled={isLoadingPostalCode}
          />
          <ControlledInput
            id="address.district"
            label="Bairro"
            isRequired
            register={register}
            errorMessage={errors.address?.district?.message}
            defaultValue={supplier?.addresses?.[0]?.district}
            placeholder="Ex. Centro"
            disabled={isLoadingPostalCode}
          />

          {memorizedStates && (
            <ControlledSelect
              label="Estado"
              name="address.state"
              control={control}
              isRequired
              errorMessage={errors.address?.state?.message}
              defaultValue={supplier?.addresses?.[0]?.state}
              options={memorizedStates}
              placeHolder="Selecione um estado"
              searchLabel="Pesquisar estado"
              emptyLabel="Sem estados cadastrados"
              disabled={isLoadingPostalCode}
            />
          )}
          {memorizedStates && memorizedCities && (
            <ControlledSelect
              label="Cidade"
              name="address.city"
              control={control}
              isRequired
              errorMessage={errors.address?.city?.message}
              defaultValue={supplier?.addresses?.[0]?.city}
              options={memorizedCities}
              placeHolder="Selecione uma cidade"
              searchLabel="Pesquisar cidade"
              emptyLabel="Sem cidades cadastrados"
              disabled={isLoadingPostalCode}
            />
          )}
        </>
      )}
      <Button
        isLoading={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Alterar fornecedor
      </Button>
    </form>
  );
};

export const EditSupplierForm = memo(EditSupplierFormComponent);
