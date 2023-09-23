'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@axios';

import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';

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
      await api.put(`/suppliers/${supplier?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCloseModal();
      toast({
        title: 'Fornecedor atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage = error.response.data.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar o fornecedor',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  if (!supplier || memorizedStates.length < 1) {
    // TODO -> Add skeleton
    return <h1>Carregando...</h1>;
  }

  // TODO -> fix addresses list

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
          <ControlledInput
            id="address.address"
            label="Endereço"
            isRequired
            register={register}
            errorMessage={errors.address?.address?.message}
            defaultValue={supplier?.addresses?.[0]?.address}
            placeholder="Ex. Rua de casa"
          />
          <ControlledInput
            id="address.number"
            label="Número"
            isRequired
            register={register}
            errorMessage={errors.address?.number?.message}
            defaultValue={supplier?.addresses?.[0]?.number}
            placeholder="Ex. 123A"
          />
          <ControlledInput
            id="address.district"
            label="Bairro"
            isRequired
            register={register}
            errorMessage={errors.address?.district?.message}
            defaultValue={supplier?.addresses?.[0]?.district}
            placeholder="Ex. Centro"
          />
          <MaskedInput
            id="address.postal_code"
            label="CEP"
            isRequired
            control={control}
            errorMessage={errors.address?.postal_code?.message}
            defaultValue={supplier?.addresses?.[0]?.postalCode}
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
                state => state.key === supplier?.addresses?.[0]?.state,
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
                city => city.key === supplier?.addresses?.[0]?.city,
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
        Alterar fornecedor
      </Button>
    </form>
  );
};

export const EditSupplierForm = memo(EditSupplierFormComponent);
