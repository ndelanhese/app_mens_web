'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import {
  PostalCodeInput,
  ViacepResponseData,
} from '@components/ui/inputs/postalCodeInput';

import { convertDateFormat } from '@utils/helpers/date';
import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCities, getStates } from '../../api/apiData';
import {
  EmployeeFormSchema,
  employeeFormSchema,
} from './createEmployeeForm.schema';
import {
  CityResponse,
  EmployeeFormProps,
  StateResponse,
} from './createEmployeeForm.types';

const CreateEmployeeFormComponent = ({
  handleCloseModal,
}: EmployeeFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const [states, setStates] = useState<StateResponse[] | undefined>(undefined);
  const [cities, setCities] = useState<
    { value: string; label: string }[] | undefined
  >(undefined);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
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
  } = useForm<EmployeeFormSchema>({
    resolver: zodResolver(employeeFormSchema),
  });

  const stateResponse = useCallback(async () => {
    const response = await getStates();
    setStates(response);
  }, []);

  const handleSelectState = useCallback(async () => {
    const state = watch('address.state');
    if (state) {
      setIsLoadingCities(true);
      const response = await getCities(state.value);
      response && setCities(convertCitiesToComboboxOptions(response));
      setValue('address.city', null);
      setIsLoadingCities(false);
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

  const onSubmit: SubmitHandler<EmployeeFormSchema> = async data => {
    try {
      const {
        address,
        admission_date: admissionDate,
        birth_date: birthDate,
        resignation_date: resignationDate,
        ...restData
      } = data;
      const { state, city, ...restAddress } = address;
      const stateValue = memorizedStates.find(
        item => item.label === state.label,
      )?.label;
      const cityValue = cities?.find(item => item.label === city?.label)?.label;

      const newEmployee = {
        ...restData,
        admission_date: convertDateFormat(admissionDate),
        birth_date: convertDateFormat(birthDate),
        ...(resignationDate
          ? { resignation_date: convertDateFormat(resignationDate) }
          : {}),
        address: {
          ...restAddress,
          state: stateValue,
          city: cityValue,
        },
      };

      await api.post(
        '/employees',
        { ...newEmployee },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Funcionário criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o funcionário',
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

          const postalCodeCity = cities?.find(
            city => city.value === convertStringToSlug(response.localidade),
          );

          if (postalCodeCity && !isLoadingCities) {
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
    [isLoadingCities, cities, memorizedStates, setFocus, setValue, toast],
  );

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
      />
      <MaskedInput
        id="rg"
        label="RG"
        control={control}
        errorMessage={errors.rg?.message}
        placeholder="Ex. 12.345.678-9"
        mask="99.999.999-9"
      />
      <MaskedInput
        id="birth_date"
        label="Data de nascimento"
        isRequired
        control={control}
        errorMessage={errors.birth_date?.message}
        placeholder="Ex. 01/01/2000"
        mask="99/99/9999"
      />
      <MaskedInput
        id="phone"
        label="Celular"
        isRequired
        control={control}
        errorMessage={errors.phone?.message}
        placeholder="Ex. (11) 99999-9999"
        mask="(99) 99999-9999"
      />
      <MaskedInput
        id="pis_pasep"
        label="PIS/PASEP"
        isRequired
        control={control}
        errorMessage={errors.pis_pasep?.message}
        placeholder="Ex. 123.45678.91-0"
        mask="999.99999.99-9"
      />
      <MaskedInput
        id="admission_date"
        label="Data de admissão"
        isRequired
        control={control}
        errorMessage={errors.admission_date?.message}
        placeholder="Ex. 01/01/2000"
        mask="99/99/9999"
      />
      <MaskedInput
        id="resignation_date"
        label="Data de demissão"
        control={control}
        errorMessage={errors.resignation_date?.message}
        placeholder="Ex. 01/01/2000"
        mask="99/99/9999"
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
        Criar novo funcionário
      </Button>
    </FormGrid>
  );
};

export const CreateEmployeeForm = memo(CreateEmployeeFormComponent);
