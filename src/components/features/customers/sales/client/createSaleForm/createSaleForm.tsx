'use client';

import { api } from '@axios';
import { CreateUserForm } from '@components/features/administration/users/client/createUserForm/createUserForm';
import { CreateCustomerForm } from '@components/features/customers/customers/client/createCustomerForm/createCustomerForm';
import { DataTable } from '@components/shared/dataTable';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { FormGridSkeleton } from '@components/shared/formGridSkeleton';
import { SearchProductModal } from '@components/shared/searchProductModal/searchProductModal';
import { RefModalProps } from '@components/shared/table/table.types';
import { AlertDialog } from '@components/ui/alertDialog/alertDialog';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { NumberInput } from '@components/ui/inputs/numberInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { Button as ShadCnButton } from '@components/ui/shadcn/button';
import { TableCell, TableRow } from '@components/ui/shadcn/table';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  calculateInstallments,
  convertMoneyStringToNumber,
  formatMoneyByCurrencySymbol,
} from '@utils/helpers';
import { convertDateFormat, currentDateString } from '@utils/helpers/date';
import { Minus, Plus, Trash } from 'lucide-react';
import { nanoid } from 'nanoid';
import { parseCookies } from 'nookies';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  getCustomers,
  getDiscountType,
  getMethodsOfPayments,
  getUsers,
} from '../../api/apiData';
import { SaleFormSchema, saleFormSchema } from './createSaleForm.schema';
import {
  CreatableSelects,
  Customer,
  DiscountType,
  DiscountTypeEnum,
  MethodOfPayment,
  NewItemModal,
  Product,
  ProductTable,
  SaleFormProps,
  User,
} from './createSaleForm.types';

const CreateSaleFormComponent = ({ handleCloseModal }: SaleFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const createItemModalRef = useRef<RefModalProps | null>(null);
  const [newItemModal, setNewItemModal] = useState<NewItemModal | undefined>(
    undefined,
  );

  const selectProductModalRef = useRef<RefModalProps | null>(null);

  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [discountType, setDiscountType] = useState<DiscountType[] | undefined>(
    undefined,
  );
  const [methodsOfPayments, setMethodsOfPayments] = useState<
    MethodOfPayment[] | undefined
  >(undefined);
  const [discountTypeSelected, setDiscountTypeSelected] = useState<
    DiscountTypeEnum | undefined
  >(undefined);

  const columns = [
    'Código',
    'Nome',
    'Part Number',
    'Valor Uni',
    'Qtd.',
    'Valor Total',
    '',
  ];

  const DELETE_ITEM_TRIGGER = (
    <StyledDiv>
      <Trash className="h-4 w-4" />
    </StyledDiv>
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SaleFormSchema>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      date: currentDateString(),
      status: 'completed',
      discount_type: null,
      installments: null,
    },
  });

  const handleRemoveItemFromProducts = useCallback(
    (idToRemove: number) => {
      if (products) {
        const updatedProducts = products.filter(
          product => product.id !== idToRemove,
        );
        setProducts(updatedProducts);
        if (updatedProducts.length === 0) {
          setValue('final_amount', '');
          setValue('total_amount', '');
        }
      }
    },
    [products, setValue],
  );

  const updateProductQuantity = useCallback(
    (id: number, currentQty: number, operator: number) => {
      setProducts(prev => {
        return prev?.map(product => {
          if (product.id === id) {
            const value = Number(
              (product.unity_value * (currentQty + operator)).toFixed(2),
            );
            return {
              ...product,
              qty: currentQty + operator,
              value,
              value_formatted: formatMoneyByCurrencySymbol(value),
            };
          }
          return product;
        });
      });
    },
    [],
  );

  const productsData =
    products && products.length > 0
      ? products?.map(product => (
          <TableRow key={nanoid()}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.part_number}</TableCell>
            <TableCell>{product.unity_value_formatted}</TableCell>
            <TableCell>{product.qty} Und.</TableCell>
            <TableCell>{product.value_formatted}</TableCell>
            <TableCell className="inline-flex w-fit space-x-2">
              <ShadCnButton
                size="icon"
                type="button"
                variant="outline"
                disabled={product.qty <= 1}
                onClick={() => {
                  updateProductQuantity(product.id, product.qty, -1);
                }}
              >
                <Minus className="h-4 w-4" />
              </ShadCnButton>
              <ShadCnButton
                size="icon"
                type="button"
                variant="outline"
                onClick={() => {
                  updateProductQuantity(product.id, product.qty, 1);
                }}
              >
                <Plus className="h-4 w-4" />
              </ShadCnButton>
              <AlertDialog
                actionLabel="Confirmar"
                cancelLabel="Cancelar"
                description={
                  'Você tem certeza que deseja remover este produto?'
                }
                onAction={() => {
                  handleRemoveItemFromProducts(product.id);
                }}
                title={'Excluir'}
                trigger={DELETE_ITEM_TRIGGER}
              />
            </TableCell>
          </TableRow>
        ))
      : undefined;
  const onSubmit: SubmitHandler<SaleFormSchema> = async data => {
    try {
      if (!products || (products && products?.length < 1)) {
        toast({
          title: 'Erro ao criar pedido',
          description: 'Adicione ao menos um produto.',
          variant: 'destructive',
        });
        selectProductModalRef.current?.open();
        return;
      }
      const selectedProducts = products.map(product => ({
        id: product.id,
        quantity: product.qty,
      }));
      const {
        customer,
        user,
        date,
        total_amount: totalAmount,
        final_amount: finalAmount,
        method_of_payment: methodOfPayment,
        installments,
        discount_type: discountType,
        ...rest
      } = data;

      const formattedTotalAmount = convertMoneyStringToNumber(totalAmount);
      const formattedFinalAmount = convertMoneyStringToNumber(finalAmount);

      const payments = [
        {
          type: Number(methodOfPayment.value),
          installment: installments ? Number(installments.value) : 1,
        },
      ];
      await api.post(
        '/sales',
        {
          ...rest,
          date: convertDateFormat(date),
          products: selectedProducts,
          customer_id: Number(customer),
          user_id: Number(user),
          payments,
          total_value: formattedTotalAmount,
          final_value: formattedFinalAmount,
          discount_type: discountType?.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleCloseModal();
      toast({
        title: 'Venda realizada com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar a venda',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    setDiscountTypeSelected(watch('discount_type')?.value as DiscountTypeEnum);
  }, [watch('discount_type')]);

  const getCustomersData = useCallback(async () => {
    const customersResponse = await getCustomers();
    setCustomers(customersResponse);
  }, []);

  const getUsersData = useCallback(async () => {
    const usersResponse = await getUsers();
    setUsers(usersResponse);
  }, []);

  const getDiscountTypeData = useCallback(async () => {
    const response = await getDiscountType();
    setDiscountType(response);
  }, []);

  const getMethodsOfPaymentsData = useCallback(async () => {
    const response = await getMethodsOfPayments();
    setMethodsOfPayments(response);
  }, []);

  useEffect(() => {
    getCustomersData();
    getUsersData();
    getDiscountTypeData();
    getMethodsOfPaymentsData();
  }, [
    getCustomersData,
    getUsersData,
    getDiscountTypeData,
    getMethodsOfPaymentsData,
  ]);

  const memorizedCustomersOptions = useMemo(() => {
    if (customers) {
      return customers.map(customer => ({
        value: customer.id.toString(),
        label: `${customer.name.trim()} - ${customer.cpf}`,
      }));
    }
    return [];
  }, [customers]);

  const memorizedUsersOptions = useMemo(() => {
    if (users) {
      return users.map(user => ({
        value: user.id.toString(),
        label: `${user.employee.name.trim()} - ${user.employee.cpf}`,
      }));
    }
    return [];
  }, [users]);

  const memoizedMethodsOfPaymentsOptions = useMemo(() => {
    if (methodsOfPayments) {
      return methodsOfPayments.map(method => ({
        value: method.id.toString(),
        label: method.name,
      }));
    }
  }, [methodsOfPayments]);

  const handleCloseSelectProductModal = useCallback(() => {
    selectProductModalRef.current?.close();
  }, []);

  const handleRowClick = useCallback((row: ProductTable) => {
    setProducts(prev => {
      const newProduct: Product = {
        id: row.id,
        name: row.name,
        part_number: row.partNumber,
        qty: 1,
        unity_value: convertMoneyStringToNumber(row.price),
        unity_value_formatted: row.price,
        value: convertMoneyStringToNumber(row.price),
        value_formatted: row.price,
      };

      const existingIds = new Set(prev?.map(product => product.id));

      if (existingIds.has(newProduct.id)) {
        return prev;
      }

      return prev ? [...prev, newProduct] : [newProduct];
    });
  }, []);

  const memoizedTotalValue = useMemo(() => {
    return (
      products?.reduce(
        (accumulator, current) => accumulator + current.value,
        0,
      ) ?? 0
    );
  }, [products]);

  useEffect(() => {
    if (memoizedTotalValue) {
      setValue('total_amount', formatMoneyByCurrencySymbol(memoizedTotalValue));
    }
  }, [memoizedTotalValue, setValue]);

  const memoizedFinalValue = useMemo(() => {
    if (
      discountTypeSelected === 'fixed' &&
      memoizedTotalValue &&
      watch('discount_amount')
    ) {
      const formattedDiscountAmount = convertMoneyStringToNumber(
        String(watch('discount_amount')) ?? '0',
      );
      const value = memoizedTotalValue - formattedDiscountAmount;

      const finalAmount = value >= 0 ? value : 0;
      setValue(
        'final_amount',
        finalAmount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      );
      return finalAmount;
    }
    if (
      discountTypeSelected === 'percentage' &&
      memoizedTotalValue &&
      watch('discount_amount')
    ) {
      const replacedDiscountAmount = watch('discount_amount')
        ?.toString()
        ?.replaceAll('%', '');
      return (
        memoizedTotalValue -
        (memoizedTotalValue * (Number(replacedDiscountAmount) ?? 1)) / 100
      );
    }
    if (memoizedTotalValue) {
      return memoizedTotalValue;
    }
    return 0;
  }, [discountTypeSelected, memoizedTotalValue, watch('discount_amount')]);

  useEffect(() => {
    if (memoizedFinalValue) {
      setValue('final_amount', formatMoneyByCurrencySymbol(memoizedFinalValue));
    }
  }, [memoizedFinalValue, setValue]);

  const memoizedInstallments = useMemo(() => {
    const inputMethod = watch('method_of_payment');
    if (!inputMethod) return;
    const methodName = memoizedMethodsOfPaymentsOptions?.find(
      method => method.value === inputMethod.value,
    )?.label;
    if (methodName === 'Cartão de Crédito' && memoizedFinalValue) {
      const installments = calculateInstallments(memoizedFinalValue, 12);
      return installments.map(installment => ({
        value: installment.installment.toString(),
        label: `${installment.installment}x - ${installment.amount}`,
      }));
    }
  }, [
    memoizedFinalValue,
    memoizedMethodsOfPaymentsOptions,
    watch('method_of_payment'),
  ]);

  const handleCloseNewItemModal = useCallback(async () => {
    await getCustomersData();
    await getUsersData();
    setNewItemModal(undefined);
    createItemModalRef.current?.close();
  }, [getCustomersData, getUsersData]);

  useEffect(() => {
    if (newItemModal) {
      createItemModalRef.current?.open();
    }
  }, [newItemModal]);

  const newItemCallbackFunction = useCallback(
    async (inputName: string) => {
      switch (inputName as CreatableSelects) {
        case 'customer':
          setNewItemModal({
            newItemDialogContent: (
              <CreateCustomerForm
                handleCloseModal={async () => {
                  await handleCloseNewItemModal();
                }}
              />
            ),
            newItemDialogDescription: 'Criar um novo cliente no sistema.',
            newItemDialogRef: ref => {
              createItemModalRef.current = ref;
            },
            newItemDialogTitle: 'Criar novo cliente',
            newItemName: inputName as CreatableSelects,
          });
          break;
        case 'user':
          setNewItemModal({
            newItemDialogContent: (
              <CreateUserForm
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
          break;
      }
    },
    [handleCloseNewItemModal],
  );

  const isLoading =
    !memorizedCustomersOptions ||
    !memorizedUsersOptions ||
    !memoizedMethodsOfPaymentsOptions;

  if (isLoading) {
    return <FormGridSkeleton qtyOfInputs={8} />;
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
        label="Cliente"
        name="customer"
        control={control}
        errorMessage={errors.customer?.message}
        options={memorizedCustomersOptions}
        placeHolder="Selecione um cliente"
        searchLabel="Pesquisar cliente"
        emptyLabel="Sem clientes cadastrados"
        isRequired
        menuPosition="bottom"
        newItemLabel="Criar um novo cliente?"
        newItemCallbackFunction={newItemCallbackFunction}
      />

      <ControlledInput
        id="observation"
        label="Observação"
        placeholder="Ex. A calça tem um bolso..."
        register={register}
        errorMessage={errors.observation?.message}
      />

      <MaskedInput
        id="date"
        label="Data da venda"
        control={control}
        errorMessage={errors.date?.message}
        placeholder="Ex. 10/01/2019"
        mask="99/99/9999"
        isRequired
        inputMode="numeric"
      />

      <ControlledSelect
        label="Funcionário"
        name="user"
        control={control}
        errorMessage={errors.user?.message}
        options={memorizedUsersOptions}
        placeHolder="Selecione um Funcionário"
        searchLabel="Pesquisar funcionário"
        emptyLabel="Sem funcionários cadastrados"
        isRequired
        menuPosition="bottom"
        newItemLabel="Criar um novo funcionário?"
        newItemCallbackFunction={newItemCallbackFunction}
      />

      <div className="col-start-1 col-end-2 flex flex-col items-center justify-between pb-2 sm:col-end-3 sm:flex-row">
        <h1 className="mb-2 text-black-80 dark:text-white-80 sm:mb-0">
          Produtos
        </h1>
        <SearchProductModal
          handleRowClick={handleRowClick}
          handleCloseModal={handleCloseSelectProductModal}
          modalRef={ref => {
            selectProductModalRef.current = ref;
          }}
        />
      </div>
      <div className="col-start-1 col-end-2 h-px bg-neutral-600 dark:bg-black-80 sm:col-end-3" />

      <div className="col-start-1 col-end-2 sm:col-end-3">
        <DataTable
          columns={columns}
          emptyMessage="Nenhum produto para essa promoção."
        >
          {productsData}
        </DataTable>
      </div>

      <ControlledSelect
        label="Tipo de desconto"
        name="discount_type"
        control={control}
        errorMessage={errors.discount_type?.message}
        options={discountType}
        placeHolder="Selecione o tipo de desconto"
        searchLabel="Pesquisar tipo de desconto"
        emptyLabel="Sem resultados"
      />
      {discountTypeSelected && (
        <NumberInput
          id="discount_amount"
          label="Valor do desconto"
          control={control}
          errorMessage={errors.discount_amount?.message}
          placeholder={
            discountTypeSelected === 'percentage' ? 'Ex. 10%' : 'Ex. R$ 50,99'
          }
          disabled={!discountTypeSelected}
          mask={discountTypeSelected === 'percentage' ? 'percentage' : 'money'}
          prefix={discountTypeSelected === 'fixed' ? 'R$' : '%'}
          inputMode="numeric"
        />
      )}

      <ControlledInput
        id="total_amount"
        label="Valor Total"
        placeholder="Ex. R$ 19,90"
        register={register}
        errorMessage={errors.total_amount?.message}
        defaultValue={memoizedTotalValue?.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
        readOnly
      />

      <ControlledInput
        id="final_amount"
        label="Valor Final"
        placeholder="Ex. R$ 19,90"
        register={register}
        errorMessage={errors.final_amount?.message}
        defaultValue={memoizedFinalValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
        readOnly
      />

      {methodsOfPayments && memoizedMethodsOfPaymentsOptions && (
        <ControlledSelect
          label="Método de pagamento"
          name="method_of_payment"
          control={control}
          errorMessage={errors.method_of_payment?.message}
          options={memoizedMethodsOfPaymentsOptions}
          defaultValue="1"
          placeHolder="Selecione o método de pagamento"
          searchLabel="Pesquisar método de pagamento"
          emptyLabel="Sem resultados"
          isRequired
          isClearable={false}
        />
      )}

      {memoizedInstallments && (
        <ControlledSelect
          label="Parcelas"
          name="installments"
          control={control}
          errorMessage={errors.installments?.message}
          options={memoizedInstallments}
          defaultValue="1"
          placeHolder="Selecione o método de pagamento"
          searchLabel="Pesquisar método de pagamento"
          emptyLabel="Sem resultados"
          isRequired
        />
      )}

      {/* <div className="flex flex-1 items-end pb-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Múltiplos pagamentos
          </label>
        </div>
      </div> */}

      {/* 
Neste ponto, será a sessão de pagamento, no pagamento o usuário seleciona o tipo de pagamento usando as opções válidas que são listadas no dropdown, e também é possível clicar num checkbox onde ele habilita multiplos providers de pagamentos, onde então é aberto o sistema de tabela para poder contar os pagamentos, tendo então o gerenciamento de parcelas, valores e etc.
*/}

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Criar
      </Button>
    </FormGrid>
  );
};

export const CreateSaleForm = memo(CreateSaleFormComponent);
