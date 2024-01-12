'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';
import {
  ViacepResponseData,
  PostalCodeInput,
} from '@components/ui/inputs/postalCodeInput';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';
import { convertDateFormat } from '@utils/helpers/date';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCities, getStates } from '../../api/apiData';
import {
  CustomerFormSchema,
  customerFormSchema,
} from './editCustomerForm.schema';
import {
  CityResponse,
  CustomerFormProps,
  StateResponse,
} from './editCustomerForm.types';

const EditCustomerFormComponent = ({
  handleCloseModal,
  customer,
}: CustomerFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [states, setStates] = useState<StateResponse[] | undefined>(undefined);
  const [cities, setCities] = useState<CityResponse[] | undefined>(undefined);
  const [selectedState, setSelectedState] = useState<boolean>(false);
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
  } = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
  });

  const stateResponse = useCallback(async () => {
    const response = await getStates();
    setStates(response);
  }, []);

  const handleSelectState = useCallback(async () => {
    const state = watch('address.state').value;
    if (state) {
      const response = await getCities(state);
      setCities(response);
      setValue('address.city', null);
    }
  }, [setValue, watch]);

  useEffect(() => {
    stateResponse();
  }, [stateResponse]);

  useEffect(() => {
    if (watch('address.state')?.value) {
      setSelectedState(true);
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

  const onSubmit: SubmitHandler<CustomerFormSchema> = async data => {
    try {
      const { address, birth_date: birthDate, ...restData } = data;
      const { city, state, ...restAddress } = address;
      const stateValue = memorizedStates.find(
        item => item.label === state.label,
      )?.label;
      const cityValue = memorizedCities.find(item => item.label === city?.label)
        ?.label;

      await api.put(
        `/customers/${customer?.id}`,
        {
          ...restData,
          birth_date: convertDateFormat(birthDate),
          status: 'active',
          address: {
            id: customer?.addresses[0].id,
            city: stateValue,
            state: cityValue,
            ...restAddress,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleCloseModal();
      toast({
        title: 'Cliente atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o cliente',
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

  if (!customer || memorizedStates.length < 1) {
    return <TableSkeleton />;
  }

  return (
    <form
      className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {customer && (
        <>
          <ControlledInput
            id="id"
            label="Código"
            defaultValue={customer?.id}
            readOnly
          />
          <ControlledInput
            id="name"
            label="Nome"
            isRequired
            register={register}
            errorMessage={errors.name?.message}
            defaultValue={customer?.name}
            placeholder="Ex. João da Silva"
          />
          <MaskedInput
            id="cpf"
            label="CPF"
            isRequired
            control={control}
            errorMessage={errors.cpf?.message}
            defaultValue={customer?.cpf}
            placeholder="Ex. 123.456.789-10"
            mask="999.999.999-99"
          />
          <MaskedInput
            id="rg"
            label="RG"
            control={control}
            errorMessage={errors.rg?.message}
            defaultValue={customer?.rg}
            placeholder="Ex. 12.345.678-9"
            mask="99.999.999-9"
          />
          <MaskedInput
            id="birth_date"
            label="Data de nascimento"
            isRequired
            control={control}
            errorMessage={errors.birth_date?.message}
            defaultValue={customer?.birth_date}
            placeholder="Ex. 01/01/2000"
            mask="99/99/9999"
          />
          <MaskedInput
            id="phone"
            label="Celular"
            isRequired
            control={control}
            errorMessage={errors.phone?.message}
            defaultValue={customer?.phone}
            placeholder="Ex. (11) 99999-9999"
            mask="(99) 99999-9999"
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
            defaultValue={customer?.addresses?.[0]?.postal_code}
          />

          <ControlledInput
            id="address.address"
            label="Endereço"
            isRequired
            register={register}
            errorMessage={errors.address?.address?.message}
            defaultValue={customer?.addresses?.[0]?.address}
            placeholder="Ex. Rua de casa"
            disabled={isLoadingPostalCode}
          />
          <ControlledInput
            id="address.number"
            label="Número"
            isRequired
            register={register}
            errorMessage={errors.address?.number?.message}
            defaultValue={customer?.addresses?.[0]?.number}
            placeholder="Ex. 123A"
            disabled={isLoadingPostalCode}
          />
          <ControlledInput
            id="address.district"
            label="Bairro"
            isRequired
            register={register}
            errorMessage={errors.address?.district?.message}
            defaultValue={customer?.addresses?.[0]?.district}
            placeholder="Ex. Centro"
            disabled={isLoadingPostalCode}
          />
          {memorizedStates && memorizedStates.length > 0 && (
            <ControlledSelect
              label="Estado"
              name="address.state"
              control={control}
              isRequired
              errorMessage={errors.address?.state?.message}
              defaultValue={customer?.addresses?.[0]?.state}
              options={memorizedStates}
              placeHolder="Selecione um estado"
              searchLabel="Pesquisar estado"
              emptyLabel="Sem estados cadastrados"
              disabled={isLoadingPostalCode}
            />
          )}
          {memorizedStates && memorizedCities && selectedState && (
            <ControlledSelect
              label="Cidade"
              name="address.city"
              control={control}
              isRequired
              errorMessage={errors.address?.city?.message}
              defaultValue={customer?.addresses?.[0]?.city}
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
        Alterar cliente
      </Button>
    </form>
  );
};

export const EditCustomerForm = memo(EditCustomerFormComponent);
