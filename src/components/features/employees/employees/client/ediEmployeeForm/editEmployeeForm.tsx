'use client';

import { api } from '@axios';
import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';
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
  EmployeeFormSchema,
  employeeFormSchema,
} from './editEmployeeForm.schema';
import {
  CityResponse,
  EmployeeFormProps,
  StateResponse,
} from './editEmployeeForm.types';

const EditEmployeeFormComponent = ({
  handleCloseModal,
  employee,
}: EmployeeFormProps) => {
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
  } = useForm<EmployeeFormSchema>({
    resolver: zodResolver(employeeFormSchema),
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
      if (watch('address.state').label === employee?.addresses[0].state) {
        setValue('address.city', {
          value: convertStringToSlug(employee?.addresses[0].city ?? ''),
          label: employee?.addresses[0].city ?? '',
        });
      } else {
        setValue('address.city', null);
      }
    }
  }, [employee?.addresses, setValue, watch]);

  useEffect(() => {
    stateResponse();
  }, [stateResponse]);

  useEffect(() => {
    if (watch('address.state')?.value) {
      setSelectedState(true);
      handleSelectState();
      if (
        watch('address.state').label === employee?.addresses[0].state &&
        employee?.addresses[0].postalCode === watch('address.postal_code')
      ) {
        setValue('address.city', {
          value: convertStringToSlug(employee?.addresses[0].city ?? ''),
          label: employee?.addresses[0].city ?? '',
        });
      } else {
        setValue('address.city', null);
      }
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

  const onSubmit: SubmitHandler<EmployeeFormSchema> = async data => {
    try {
      const {
        address,
        admission_date: admissionDate,
        birth_date: birthDate,
        resignation_date: resignationDate,
        ...restData
      } = data;
      const { city, state, ...restAddress } = address;
      const stateValue = memorizedStates.find(
        item => item.label === state.label,
      )?.label;
      const cityValue = memorizedCities.find(
        item => item.label === city?.label,
      )?.label;

      await api.put(
        `/employees/${employee?.id}`,
        {
          ...restData,
          admission_date: convertDateFormat(admissionDate),
          birth_date: convertDateFormat(birthDate),
          ...(resignationDate
            ? { resignation_date: convertDateFormat(resignationDate) }
            : {}),
          address: {
            id: employee?.addresses[0].id,
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
        title: 'Funcionário atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o funcionário',
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

  if (!employee || memorizedStates.length < 1) {
    return <TableSkeleton />;
  }

  return (
    <form
      className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {employee && (
        <>
          <ControlledInput
            id="id"
            label="Código"
            defaultValue={employee?.id}
            readOnly
          />
          <ControlledInput
            id="name"
            label="Nome"
            isRequired
            register={register}
            errorMessage={errors.name?.message}
            defaultValue={employee?.name}
            placeholder="Ex. João da Silva"
          />
          <MaskedInput
            id="cpf"
            label="CPF"
            isRequired
            control={control}
            errorMessage={errors.cpf?.message}
            defaultValue={employee?.cpf}
            placeholder="Ex. 123.456.789-10"
            mask="999.999.999-99"
            inputMode="numeric"
          />
          <MaskedInput
            id="rg"
            label="RG"
            control={control}
            errorMessage={errors.rg?.message}
            defaultValue={employee?.rg}
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
            defaultValue={employee?.birthDate}
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
            defaultValue={employee?.phone}
            placeholder="Ex. (11) 99999-9999"
            mask="(99) 99999-9999"
            inputMode="tel"
          />
          <MaskedInput
            id="pis_pasep"
            label="PIS/PASEP"
            isRequired
            control={control}
            errorMessage={errors.pis_pasep?.message}
            defaultValue={employee?.pisPasep}
            placeholder="Ex. 123.45678.91-0"
            mask="999.99999.99-9"
            inputMode="numeric"
          />
          <MaskedInput
            id="admission_date"
            label="Data de admissão"
            isRequired
            control={control}
            errorMessage={errors.admission_date?.message}
            defaultValue={employee?.admissionDate}
            placeholder="Ex. 01/01/2000"
            mask="99/99/9999"
            inputMode="numeric"
          />
          <MaskedInput
            id="resignation_date"
            label="Data de demissão"
            control={control}
            errorMessage={errors.resignation_date?.message}
            defaultValue={employee?.resignationDate ?? undefined}
            placeholder="Ex. 01/01/2000"
            mask="99/99/9999"
            inputMode="numeric"
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
            defaultValue={employee?.addresses?.[0]?.postalCode}
            inputMode="numeric"
          />

          <ControlledInput
            id="address.address"
            label="Endereço"
            isRequired
            register={register}
            errorMessage={errors.address?.address?.message}
            defaultValue={employee?.addresses?.[0]?.address}
            placeholder="Ex. Rua de casa"
            disabled={isLoadingPostalCode}
          />
          <ControlledInput
            id="address.number"
            label="Número"
            isRequired
            register={register}
            errorMessage={errors.address?.number?.message}
            defaultValue={employee?.addresses?.[0]?.number}
            placeholder="Ex. 123A"
            disabled={isLoadingPostalCode}
          />
          <ControlledInput
            id="address.district"
            label="Bairro"
            isRequired
            register={register}
            errorMessage={errors.address?.district?.message}
            defaultValue={employee?.addresses?.[0]?.district}
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
              defaultValue={employee?.addresses?.[0]?.state}
              options={memorizedStates}
              placeHolder="Selecione um estado"
              searchLabel="Pesquisar estado"
              emptyLabel="Sem estados cadastrados"
              disabled={isLoadingPostalCode}
            />
          )}
          {memorizedStates && memorizedCities && memorizedCities.length > 0 && (
            <ControlledSelect
              label="Cidade"
              name="address.city"
              control={control}
              isRequired
              errorMessage={errors.address?.city?.message}
              defaultValue={employee?.addresses?.[0]?.city}
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
        Editar
      </Button>
    </form>
  );
};

export const EditEmployeeForm = memo(EditEmployeeFormComponent);
