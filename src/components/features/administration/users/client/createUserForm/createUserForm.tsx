'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { api } from '@axios';

import { FormGridSkeleton } from '@components/shared/formGridSkeleton';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { PasswordInput } from '@components/ui/inputs/passwordInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { RefModalProps } from '@components/shared/table/table.types';
import { CreateEmployeeForm } from '@components/features/employees/employees/client/createEmployeeForm/createEmployeeForm';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getEmployees } from '../api/apiData';
import {
  CreateUserFormSchema,
  createUserFormSchema,
} from './createUserForm.schema';
import {
  CreatableSelects,
  CreateUserFormProps,
  Employees,
  NewItemModal,
} from './createUserForm.types';

export const CreateUserForm = ({ handleCloseModal }: CreateUserFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const createItemModalRef = useRef<RefModalProps | null>(null);
  const [newItemModal, setNewItemModal] = useState<NewItemModal | undefined>(
    undefined,
  );

  const [employees, setEmployees] = useState<Employees[] | undefined>(
    undefined,
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormSchema>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit: SubmitHandler<CreateUserFormSchema> = async data => {
    try {
      // eslint-disable-next-line camelcase, @typescript-eslint/no-unused-vars
      const { employee, confirm_password, ...rest } = data;
      await api.post(
        '/users',
        { ...rest, employee_id: employee.value, status: 'active' },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleCloseModal();
      toast({
        title: 'Usuário criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar o usuário',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const getEmployeesData = useCallback(async () => {
    const response = await getEmployees();
    setEmployees(response);
  }, []);

  useEffect(() => {
    getEmployeesData();
  }, [getEmployeesData]);

  const memorizedEmployeesOptions = useMemo(() => {
    if (employees) {
      return employees.map(employee => ({
        value: employee.id.toString(),
        label: `${employee.name.trim()} - ${employee.cpf}`,
      }));
    }
    return [];
  }, [employees]);

  const handleCloseNewItemModal = useCallback(async () => {
    await getEmployeesData();
    setNewItemModal(undefined);
    createItemModalRef.current?.close();
  }, [getEmployeesData]);

  useEffect(() => {
    if (newItemModal) {
      createItemModalRef.current?.open();
    }
  }, [newItemModal]);

  const newItemCallbackFunction = useCallback(
    async (inputName: string) => {
      setNewItemModal({
        newItemDialogContent: (
          <CreateEmployeeForm
            handleCloseModal={async () => {
              await handleCloseNewItemModal();
            }}
          />
        ),
        newItemDialogDescription: 'Criar novo funcionário no sistema.',
        newItemDialogRef: ref => {
          createItemModalRef.current = ref;
        },
        newItemDialogTitle: 'Criar novo funcionário',
        newItemName: inputName as CreatableSelects,
      });
    },
    [handleCloseNewItemModal],
  );

  const isLoading = !memorizedEmployeesOptions;

  if (isLoading) {
    return <FormGridSkeleton qtyOfInputs={5} />;
  }

  return (
    <FormGrid
      onSubmit={handleSubmit(onSubmit)}
      newItemDialogContent={newItemModal?.newItemDialogContent}
      newItemDialogDescription={newItemModal?.newItemDialogDescription}
      newItemDialogTitle={newItemModal?.newItemDialogTitle}
      newItemDialogRef={newItemModal?.newItemDialogRef}
    >
      <ControlledSelect
        label="Funcionário"
        name="employee"
        control={control}
        errorMessage={errors.employee?.message}
        options={memorizedEmployeesOptions}
        placeHolder="Selecione um Funcionário"
        searchLabel="Pesquisar funcionário"
        emptyLabel="Sem funcionários cadastrados"
        isRequired
        menuPosition="bottom"
        newItemLabel="Criar um novo funcionário?"
        newItemCallbackFunction={newItemCallbackFunction}
        isSmallDropdown
      />

      <ControlledInput
        id="user"
        label="Usuário"
        placeholder="Ex: nome.sobrenome"
        register={register}
        errorMessage={errors.user?.message}
        isRequired
      />
      <ControlledInput
        id="email"
        label="E-mail"
        placeholder="Ex: nome.sobrenome@loja.com"
        register={register}
        errorMessage={errors.email?.message}
        isRequired
        type="email"
      />
      <PasswordInput
        id="password"
        label="Senha"
        placeholder="ex: S3nh4.user"
        register={register}
        errorMessage={errors.password?.message}
        isRequired
      />
      <PasswordInput
        id="confirm_password"
        label="Confirmar Senha"
        placeholder="ex: S3nh4.user"
        register={register}
        errorMessage={errors.confirm_password?.message}
        isRequired
      />

      <div className="flex">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="h-fit w-full sm:col-start-2 sm:mt-8"
        >
          Criar Usuário
        </Button>
      </div>
    </FormGrid>
  );
};
