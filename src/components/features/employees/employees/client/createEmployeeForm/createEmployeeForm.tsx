'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { FormGrid } from '@components/shared/formGrid/formGrid';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  EmployeeFormSchema,
  employeeFormSchema,
} from './createEmployeeForm.schema';
import {
  CityResponse,
  EmployeeFormProps,
  StateResponse,
} from './createEmployeeForm.types';
import { getCities, getStates } from '../../api/apiData';

const CreateEmployeeFormComponent = ({
  handleCloseModal,
}: EmployeeFormProps) => {
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

  const memorizedCities = useMemo(() => {
    if (cities) {
      return convertCitiesToComboboxOptions(cities);
    }
    return [];
  }, [cities]);

  const onSubmit: SubmitHandler<EmployeeFormSchema> = async data => {
    try {
      const { address, ...restData } = data;
      const { state, city, ...restAddress } = address;
      const stateValue = memorizedStates.find(
        item => item.label === state.label,
      )?.value;
      const cityValue = memorizedCities.find(item => item.label === city?.label)
        ?.value;

      const newEmployee = {
        ...restData,
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
      {memorizedCities && memorizedCities.length > 0 && (
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
