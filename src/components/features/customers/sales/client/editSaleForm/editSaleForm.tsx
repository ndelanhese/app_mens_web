'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { api } from '@axios';

import { DataTable } from '@components/shared/dataTable';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { RefModalProps } from '@components/shared/table/table.types';
import { AlertDialog } from '@components/ui/alertDialog/alertDialog';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { Button as ShadCnButton } from '@components/ui/shadcn/button';
import { TableCell, TableRow } from '@components/ui/shadcn/table';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';
import { SearchProductModal } from '@components/shared/searchProductModal/searchProductModal';
import { NumberInput } from '@components/ui/inputs/numberInput';

import { convertDateFormat, currentDateString } from '@utils/helpers/date';
import {
  calculateInstallments,
  convertMoneyStringToNumber,
  formatMoneyByCurrencySymbol,
} from '@utils/helpers';

import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus, Trash } from 'lucide-react';
import { nanoid } from 'nanoid';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  getCustomers,
  getDiscountType,
  getMethodsOfPayments,
  getStatus,
  getUsers,
} from '../../api/apiData';
import { SaleFormSchema, saleFormSchema } from './editSaleForm.schema';
import {
  Customer,
  SaleFormProps,
  Product,
  ProductTable,
  Status,
  User,
  DiscountType,
  DiscountTypeEnum,
  MethodOfPayment,
} from './editSaleForm.types';
import { parseCookies } from 'nookies';

const EditSaleFormComponent = ({ handleCloseModal, sale }: SaleFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const selectProductModalRef = useRef<RefModalProps | null>(null);

  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [status, setStatus] = useState<Status[] | undefined>(undefined);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [discountType, setDiscountType] = useState<DiscountType[] | undefined>(
    undefined,
  );
  const [methodsOfPayments, setMethodsOfPayments] = useState<
    MethodOfPayment[] | undefined
  >(undefined);
  const [discountTypeSelected, setDiscountTypeSelected] = useState<
    DiscountTypeEnum | undefined
  >(sale?.discount_type);
  const [statusSelected, setStatusSelected] = useState<string | undefined>(
    undefined,
  );
  const [customerSelected, setCustomerSelected] = useState<string | undefined>(
    undefined,
  );
  const [employeeSelected, setEmployeeSelected] = useState<string | undefined>(
    undefined,
  );

  const columns = [
    'Código',
    'Nome',
    'Part Number',
    'Qtd.',
    'Valor',
    'Valor Uni',
    '',
  ];

  const DELETE_ITEM_TRIGGER = (
    <StyledDiv>
      <Trash className="h-4 w-4" />
    </StyledDiv>
  );

  const handleRemoveItemFromProducts = useCallback(
    (idToRemove: number) => {
      if (products) {
        const updatedProducts = products.filter(
          product => product.id !== idToRemove,
        );
        setProducts(updatedProducts);
      }
    },
    [products],
  );

  const updateProductQuantity = useCallback(
    (id: number, currentQty: number, operator: number) => {
      setProducts(prev => {
        return prev?.map(product => {
          if (product.id === id) {
            return { ...product, qty: currentQty + operator };
          }
          return product;
        });
      });
    },
    [],
  );

  useEffect(() => {
    const saleProducts: Product[] | undefined = sale?.products?.map(
      saleProduct => ({
        id: saleProduct.id,
        name: saleProduct.name,
        part_number: saleProduct.part_number,
        qty: saleProduct.quantity,
        unity_value: saleProduct.price,
        value: saleProduct.price * saleProduct.quantity,
      }),
    );
    setProducts(saleProducts);
  }, [sale?.products]);

  const productsData =
    products && products.length > 0
      ? products?.map(product => (
          <TableRow key={nanoid()}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.part_number}</TableCell>
            <TableCell>{product.qty}</TableCell>
            <TableCell>{product.value}</TableCell>
            <TableCell>{product.unity_value}</TableCell>
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
    },
  });

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
        discount_amount: null,
        discount_type: null,
        final_value: product.value,
      }));
      const {
        customer,
        user,
        date,
        total_amount: totalAmount,
        final_amount: finalAmount,
        method_of_payment: methodOfPayment,
        installments,
        ...rest
      } = data;
      const formattedTotalAmount = convertMoneyStringToNumber(totalAmount);
      const formattedFinalAmount = convertMoneyStringToNumber(finalAmount);

      const payments = [
        {
          type: Number(methodOfPayment),
          installment: installments ? Number(installments) : 1,
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
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleCloseModal();
      toast({
        title: 'Venda atualizado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao atualizar a venda',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    setDiscountTypeSelected(watch('discount_type') as DiscountTypeEnum);
  }, [watch('discount_type')]);

  const getCustomersData = useCallback(async () => {
    const customersResponse = await getCustomers();
    setCustomers(customersResponse);
  }, []);

  const getUsersData = useCallback(async () => {
    const usersResponse = await getUsers();
    setUsers(usersResponse);
  }, []);

  const getStatusData = useCallback(async () => {
    const response = await getStatus();
    setStatus(response);
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
    getStatusData();
    getDiscountTypeData();
    getMethodsOfPaymentsData();
  }, [
    getCustomersData,
    getUsersData,
    getStatusData,
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
        unity_value: row.price,
        value: row.price,
      };

      const existingIds = new Set(prev?.map(product => product.id));

      if (existingIds.has(newProduct.id)) {
        return prev;
      }

      return prev ? [...prev, newProduct] : [newProduct];
    });
  }, []);

  useEffect(() => {
    if (memorizedCustomersOptions) {
      setCustomerSelected(sale?.customer.id.toString());
    }
  }, [memorizedCustomersOptions, sale?.customer.id]);

  useEffect(() => {
    if (status) {
      const saleStatus = status.find(
        oneStratus => oneStratus?.value === sale?.status.toString(),
      )?.value;
      setStatusSelected(saleStatus);
    }
  }, [sale?.status, status]);

  useEffect(() => {
    if (memorizedUsersOptions && memorizedUsersOptions.length > 0) {
      setEmployeeSelected(sale?.employee.id.toString());
    }
  }, [sale?.employee, memorizedUsersOptions]);

  const memoizedTotalValue = useMemo(() => {
    return products?.reduce(
      (accumulator, current) => accumulator + current.value,
      0,
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
      return memoizedTotalValue - (watch('discount_amount') ?? 0);
    }
    if (
      discountTypeSelected === 'percentage' &&
      memoizedTotalValue &&
      watch('discount_amount')
    ) {
      return (
        memoizedTotalValue -
        (memoizedTotalValue * (watch('discount_amount') ?? 1)) / 100
      );
    }
    if (memoizedTotalValue) {
      return memoizedTotalValue;
    }
    return undefined;
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
      method => method.value === inputMethod,
    )?.value;
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

  const isLoading =
    !memorizedCustomersOptions ||
    !memorizedUsersOptions ||
    !memoizedMethodsOfPaymentsOptions ||
    !status;

  if (isLoading) {
    // TODO -> add skeleton
    return <h1>loading...</h1>;
  }

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput value={sale?.id} id="id" label="Código" readOnly />

      {memorizedCustomersOptions && customerSelected && (
        <ControlledSelect
          label="Cliente"
          name="customer"
          control={control}
          errorMessage={errors.customer?.message}
          options={memorizedCustomersOptions}
          placeHolder="Selecione um cliente"
          searchLabel="Pesquisar cliente"
          emptyLabel="Sem clientes cadastrados"
          defaultValue={customerSelected}
          isRequired
        />
      )}

      <ControlledInput
        id="observation"
        label="Observação"
        placeholder="Ex. A calça tem um bolso..."
        register={register}
        errorMessage={errors.observation?.message}
        defaultValue={sale?.observation}
        isRequired
      />

      <MaskedInput
        id="date"
        label="Data da venda"
        control={control}
        errorMessage={errors.date?.message}
        placeholder="Ex. 10/01/2019"
        mask="99/99/9999"
        defaultValue={sale?.date}
        isRequired
      />

      {memorizedUsersOptions && employeeSelected && (
        <ControlledSelect
          label="Funcionário"
          name="user"
          control={control}
          errorMessage={errors.user?.message}
          options={memorizedUsersOptions}
          placeHolder="Selecione um Funcionário"
          searchLabel="Pesquisar funcionário"
          emptyLabel="Sem funcionários cadastrados"
          defaultValue={employeeSelected}
          isRequired
        />
      )}

      {status && statusSelected && (
        <ControlledSelect
          label="Status"
          name="status"
          control={control}
          errorMessage={errors.status?.message}
          options={status}
          placeHolder="Selecione um status"
          searchLabel="Pesquisar status"
          emptyLabel="Sem status cadastrados"
          defaultValue={statusSelected}
          isRequired
        />
      )}

      <div className="col-start-1 col-end-2 flex flex-col items-center justify-between sm:col-end-3 sm:flex-row">
        <h1 className="mb-2 text-black-80 sm:mb-0 dark:text-white-80">
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
      <div className="col-start-1 col-end-2 h-px bg-neutral-600 sm:col-end-3 dark:bg-black-80" />

      <div className="col-start-1 col-end-2 sm:col-end-3">
        <DataTable
          columns={columns}
          emptyMessage="Nenhum produto para essa promoção."
        >
          {productsData}
        </DataTable>
      </div>

      {discountType && (
        <ControlledSelect
          label="Tipo de desconto"
          name="discount_type"
          control={control}
          errorMessage={errors.discount_type?.message}
          options={discountType}
          placeHolder="Selecione o tipo de desconto"
          searchLabel="Pesquisar tipo de desconto"
          emptyLabel="Sem resultados"
          defaultValue={sale?.discount_type}
        />
      )}
      {discountType && (
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
          prefix={discountTypeSelected === 'fixed' ? 'R$' : undefined}
          defaultValue={sale?.formatted_discount}
        />
      )}

      <ControlledInput
        id="total_amount"
        label="Valor Total"
        placeholder="Ex. R$ 19,90"
        register={register}
        errorMessage={errors.total_amount?.message}
        defaultValue={formatMoneyByCurrencySymbol(memoizedTotalValue)}
        readOnly
      />

      <ControlledInput
        id="final_amount"
        label="Valor Final"
        placeholder="Ex. R$ 19,90"
        register={register}
        errorMessage={errors.final_amount?.message}
        defaultValue={formatMoneyByCurrencySymbol(memoizedFinalValue)}
        readOnly
      />

      {methodsOfPayments && memoizedMethodsOfPaymentsOptions && (
        <ControlledSelect
          label="Método de pagamento"
          name="method_of_payment"
          control={control}
          errorMessage={errors.method_of_payment?.message}
          options={memoizedMethodsOfPaymentsOptions}
          defaultValue={sale?.methods_of_payments[0].method_id.toString()}
          placeHolder="Selecione o método de pagamento"
          searchLabel="Pesquisar método de pagamento"
          emptyLabel="Sem resultados"
          isRequired
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

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Atualizar pedido
      </Button>
    </FormGrid>
  );
};

export const EditSaleForm = memo(EditSaleFormComponent);
