'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { ControlledSelect } from '@/components/ui/selects/controlledSelect';
import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

import { convertStringToSlug } from '@utils/helpers/stringManipulation';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  EmployeeFormSchema,
  employeeFormSchema,
} from './createEmployeeForm.schema';
import {
  CitiesResponse,
  CityResponse,
  EmployeeFormProps,
  StateResponse,
  StatesResponse,
} from './createEmployeeForm.types';

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
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormSchema>({
    resolver: zodResolver(employeeFormSchema),
  });

  const getStates = useCallback(async () => {
    try {
      const { data } = await api.get<StatesResponse>('/states', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStates(data.data);
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao buscar estados',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast, token]);

  const getCities = useCallback(async () => {
    try {
      const { data } = await api.get<CitiesResponse>(
        `/cities?uf=${getValues('address.state')}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCities(data.data);
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? undefined;
      toast({
        title: 'Erro ao buscar cidades',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [getValues, toast, token]);

  useEffect(() => {
    getStates();
  }, [getStates]);

  useEffect(() => {
    if (watch('address.state')) {
      getCities();
      setValue('address.city', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCities, watch('address.state')]);

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
      const { address, ...restData } = data;
      const { state, city, ...restAddress } = address;
      const stateValue = memorizedStates.find(item => item.key === state)
        ?.value;
      const cityValue = memorizedCities.find(item => item.key === city)?.value;

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
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o funcionário',
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
        id="name"
        label="Nome"
        isRequired
        register={register}
        errorMessage={errors.name?.message}
        placeholder="Ex. João da Silva"
      />
      <ControlledInput
        id="cpf"
        label="CPF"
        isRequired
        register={register}
        errorMessage={errors.cpf?.message}
        placeholder="Ex. 123.456.789-10"
      />
      <ControlledInput
        id="rg"
        label="RG"
        register={register}
        errorMessage={errors.rg?.message}
        placeholder="Ex. 12.345.678-9"
      />
      <ControlledInput
        id="birth_date"
        label="Data de nascimento"
        isRequired
        register={register}
        errorMessage={errors.birth_date?.message}
        placeholder="Ex. 01/01/2000"
      />
      <ControlledInput
        id="phone"
        label="Celular"
        isRequired
        register={register}
        errorMessage={errors.phone?.message}
        placeholder="Ex. (11) 99999-9999"
      />
      <ControlledInput
        id="pis_pasep"
        label="PIS/PASEP"
        isRequired
        register={register}
        errorMessage={errors.pis_pasep?.message}
        placeholder="Ex. 123456789-10"
      />
      <ControlledInput
        id="admission_date"
        label="Data de admissão"
        isRequired
        register={register}
        errorMessage={errors.admission_date?.message}
        placeholder="Ex. 01/01/2000"
      />
      <ControlledInput
        id="resignation_date"
        label="Data de demissão"
        register={register}
        errorMessage={errors.resignation_date?.message}
        placeholder="Ex. 01/01/2000"
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
      <ControlledInput
        id="address.postal_code"
        label="CEP"
        isRequired
        register={register}
        errorMessage={errors.address?.postal_code?.message}
        placeholder="Ex. 12345-678"
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
      <Button disabled={isSubmitting} type="submit" className="sm:col-start-2">
        Criar novo funcionário
      </Button>
    </form>
  );
};

export const CreateEmployeeForm = memo(CreateEmployeeFormComponent);
