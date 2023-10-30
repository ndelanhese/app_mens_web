'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
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

  const onSubmit: SubmitHandler<EmployeeFormSchema> = async data => {
    try {
      await api.put(`/employees/${employee?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  if (!employee || memorizedStates.length < 1) {
    return <TableSkeleton />;
  }

  // TODO -> fix addresses list

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
          />
          <MaskedInput
            id="rg"
            label="RG"
            control={control}
            errorMessage={errors.rg?.message}
            defaultValue={employee?.rg}
            placeholder="Ex. 12.345.678-9"
            mask="99.999.999-9"
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
          />
          <MaskedInput
            id="resignation_date"
            label="Data de demissão"
            control={control}
            errorMessage={errors.resignation_date?.message}
            defaultValue={employee?.resignationDate ?? undefined}
            placeholder="Ex. 01/01/2000"
            mask="99/99/9999"
          />
          <ControlledInput
            id="address.address"
            label="Endereço"
            isRequired
            register={register}
            errorMessage={errors.address?.address?.message}
            defaultValue={employee?.addresses?.[0]?.address}
            placeholder="Ex. Rua de casa"
          />
          <ControlledInput
            id="address.number"
            label="Número"
            isRequired
            register={register}
            errorMessage={errors.address?.number?.message}
            defaultValue={employee?.addresses?.[0]?.number}
            placeholder="Ex. 123A"
          />
          <ControlledInput
            id="address.district"
            label="Bairro"
            isRequired
            register={register}
            errorMessage={errors.address?.district?.message}
            defaultValue={employee?.addresses?.[0]?.district}
            placeholder="Ex. Centro"
          />
          <MaskedInput
            id="address.postal_code"
            label="CEP"
            isRequired
            control={control}
            errorMessage={errors.address?.postal_code?.message}
            defaultValue={employee?.addresses?.[0]?.postalCode}
            placeholder="Ex. 12345-678"
            mask="99999-999"
          />
          <ControlledSelect
            label="Estado"
            name="address.state"
            control={control}
            isRequired
            errorMessage={errors.address?.state?.message}
            defaultValue={
              memorizedStates.find(
                state => state.key === employee?.addresses?.[0]?.state,
              )?.key
            }
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
            defaultValue={
              memorizedCities.find(
                city => city.key === employee?.addresses?.[0]?.city,
              )?.key
            }
            options={memorizedCities}
            placeHolder="Selecione uma cidade"
            searchLabel="Pesquisar cidade"
            emptyLabel="Sem cidades cadastrados"
          />
        </>
      )}
      <Button
        isLoading={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Alterar funcionário
      </Button>
    </form>
  );
};

export const EditEmployeeForm = memo(EditEmployeeFormComponent);
