'use client';

import { api } from '@axios';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { FormGridSkeleton } from '@components/shared/formGridSkeleton';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import {
  PostalCodeInput,
  ViacepResponseData,
} from '@components/ui/inputs/postalCodeInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { convertDateFormat } from '@utils/helpers/date';
import { convertStringToSlug } from '@utils/helpers/stringManipulation';
import { parseCookies } from 'nookies';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getCities, getStates } from '../../api/apiData';
import {
  CustomerFormSchema,
  customerFormSchema,
} from './createCustomerForm.schema';
import {
  CityResponse,
  CustomerFormProps,
  StateResponse,
} from './createCustomerForm.types';

const CreateCustomerFormComponent = ({
  handleCloseModal,
}: CustomerFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [states, setStates] = useState<StateResponse[] | undefined>(undefined);
  const [cities, setCities] = useState<
    { value: string; label: string }[] | undefined
  >(undefined);
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
    const state = watch('address.state');
    if (state) {
      setValue('address.city', null);
      const response = await getCities(state.value);
      response && setCities(convertCitiesToComboboxOptions(response));
    }
  }, [setValue, watch]);

  useEffect(() => {
    stateResponse();
  }, [stateResponse]);

  useEffect(() => {
    if (watch('address.state')) {
      setValue('address.city', null);
      handleSelectState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSelectState, watch('address.state')]);

  const convertCitiesToComboboxOptions = (data: CityResponse[]) => {
    const test = data.map(item => ({
      value: convertStringToSlug(
        item.is_municipality ? item.name : item.name_with_municipality,
      ),
      label: item.is_municipality ? item.name : item.name_with_municipality,
    }));

    return test;
  };

  const memorizedStates = useMemo(() => {
    if (states) {
      return states;
    }
    return [];
  }, [states]);

  const onSubmit: SubmitHandler<CustomerFormSchema> = async data => {
    try {
      const { address, birth_date: birthDate, ...restData } = data;
      const { state, city, ...restAddress } = address;
      const stateValue = memorizedStates.find(
        item => item.label === state.label,
      )?.label;
      const cityValue = cities?.find(item => item.label === city?.label)?.label;

      const newCustomer = {
        ...restData,
        birth_date: convertDateFormat(birthDate),
        status: 'active',
        address: {
          ...restAddress,
          state: stateValue,
          city: cityValue,
        },
      };

      await api.post(
        '/customers',
        { ...newCustomer },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Cliente criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o cliente',
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

          const citiesResponse = await getCities(response.uf);
          const convertedCities = citiesResponse
            ? convertCitiesToComboboxOptions(citiesResponse)
            : undefined;
          setCities(convertedCities);

          const postalCodeCity = convertedCities?.find(
            city => city.value === convertStringToSlug(response.localidade),
          );

          if (postalCodeCity) {
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
    [setValue, memorizedStates, setFocus, toast],
  );

  const isLoading = !memorizedStates;

  if (isLoading) {
    return <FormGridSkeleton qtyOfInputs={10} />;
  }

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        id="name"
        label="Nome"
        isRequired
        register={register}
        errorMessage={errors.name?.message}
        placeholder="Ex. João da Silva"
      />
      <MaskedInput
        id="cpf"
        label="CPF"
        isRequired
        control={control}
        errorMessage={errors.cpf?.message}
        placeholder="Ex. 123.456.789-10"
        mask="999.999.999-99"
        inputMode="numeric"
      />
      <MaskedInput
        id="rg"
        label="RG"
        control={control}
        errorMessage={errors.rg?.message}
        placeholder="Ex. 12.345.678-9"
        mask="99.999.999-9"
        inputMode="numeric"
      />
      <MaskedInput
        id="birth_date"
        label="Data de nascimento"
        isRequired
        control={control}
        errorMessage={errors.birth_date?.message}
        placeholder="Ex. 01/01/2000"
        mask="99/99/9999"
        inputMode="numeric"
      />
      <MaskedInput
        id="phone"
        label="Celular"
        isRequired
        control={control}
        errorMessage={errors.phone?.message}
        placeholder="Ex. (11) 99999-9999"
        mask="(99) 99999-9999"
        inputMode="tel"
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
        inputMode="numeric"
      />
      <ControlledInput
        id="address.address"
        label="Endereço"
        isRequired
        register={register}
        errorMessage={errors.address?.address?.message}
        placeholder="Ex. Rua de casa"
        disabled={isLoadingPostalCode}
      />
      <ControlledInput
        id="address.number"
        label="Número"
        isRequired
        register={register}
        errorMessage={errors.address?.number?.message}
        placeholder="Ex. 123A"
        disabled={isLoadingPostalCode}
      />
      <ControlledInput
        id="address.district"
        label="Bairro"
        isRequired
        register={register}
        errorMessage={errors.address?.district?.message}
        placeholder="Ex. Centro"
        disabled={isLoadingPostalCode}
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
        disabled={isLoadingPostalCode}
      />
      {cities && cities.length > 0 && (
        <ControlledSelect
          label="Cidade"
          name="address.city"
          control={control}
          isRequired
          errorMessage={errors.address?.city?.message}
          options={cities}
          placeHolder="Selecione uma cidade"
          searchLabel="Pesquisar cidade"
          emptyLabel="Sem cidades cadastrados"
          disabled={isLoadingPostalCode}
        />
      )}
      <Button
        isLoading={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Criar
      </Button>
    </FormGrid>
  );
};

export const CreateCustomerForm = memo(CreateCustomerFormComponent);
