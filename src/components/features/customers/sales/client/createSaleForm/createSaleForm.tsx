'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { api } from '@axios';

import { DataTable } from '@components/shared/dataTable';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { SearchProductModal } from '@components/shared/searchProductModal/searchProductModal';
import { RefModalProps } from '@components/shared/table/table.types';
import { AlertDialog } from '@components/ui/alertDialog/alertDialog';
import { Button } from '@components/ui/buttons/button';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { MaskedInput } from '@components/ui/inputs/maskedInput';
import { ControlledSelect } from '@components/ui/selects/controlledSelect';
import { TableCell, TableRow } from '@components/ui/shadcn/table';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';
import { Button as ShadCnButton } from '@components/ui/shadcn/button';

import { convertDateFormat, currentDateString } from '@utils/helpers/date';

import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus, Trash } from 'lucide-react';
import { nanoid } from 'nanoid';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCustomers, getStatus, getUsers } from '../../api/apiData';
import { SaleFormSchema, saleFormSchema } from './createSaleForm.schema';
import {
  Customer,
  SaleFormProps,
  Product,
  ProductTable,
  Status,
  User,
} from './createSaleForm.types';

const CreateSaleFormComponent = ({ handleCloseModal }: SaleFormProps) => {
  const { toast } = useToast();

  const { token } = parseCookies();

  const selectProductModalRef = useRef<RefModalProps | null>(null);

  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [status, setStatus] = useState<Status[] | undefined>(undefined);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const columns = ['Código', 'Nome', 'Part Number', 'Qtd.', ''];

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

  const productsData =
    products && products.length > 0
      ? products?.map(product => (
          <TableRow key={nanoid()}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.part_number}</TableCell>
            <TableCell>{product.qty}</TableCell>
            <TableCell className="w-fit space-x-2">
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
      }));
      const { customer, user, date, ...rest } = data;
      await api.post(
        '/sales',
        {
          ...rest,
          date: convertDateFormat(date),
          products: selectedProducts,
          customer_id: Number(customer),
          user_id: Number(user),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handleCloseModal();
      toast({
        title: 'Pedido criado com sucesso',
        variant: 'default',
      });
    } catch (error: Error | any) {
      const errorMessage =
        error?.response?.data?.message ?? 'Erro desconhecido';
      toast({
        title: 'Erro ao criar a pedido',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

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

  useEffect(() => {
    getCustomersData();
    getUsersData();
    getStatusData();
  }, [getCustomersData, getUsersData, getStatusData]);

  const memorizedCustomersOptions = useMemo(() => {
    if (customers) {
      return customers.map(customer => ({
        key: customer.id.toString(),
        value: `${customer.name.trim()} - ${customer.cpf}`,
      }));
    }
    return [];
  }, [customers]);

  const memorizedUsersOptions = useMemo(() => {
    if (users) {
      return users.map(user => ({
        key: user.id.toString(),
        value: `${user.employee.name.trim()} - ${user.employee.cpf}`,
      }));
    }
    return [];
  }, [users]);

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
      };

      const existingIds = new Set(prev?.map(product => product.id));

      if (existingIds.has(newProduct.id)) {
        return prev;
      }

      return prev ? [...prev, newProduct] : [newProduct];
    });
  }, []);

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
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
      />

      <ControlledInput
        id="description"
        label="Descrição"
        placeholder="Ex. Pedido de calças para..."
        register={register}
        errorMessage={errors.description?.message}
        isRequired
      />

      <ControlledInput
        id="observation"
        label="Observação"
        placeholder="Ex. A calça tem um bolso..."
        register={register}
        errorMessage={errors.observation?.message}
        isRequired
      />

      <MaskedInput
        id="date"
        label="Data do pedido"
        control={control}
        errorMessage={errors.date?.message}
        placeholder="Ex. 10/01/2019"
        mask="99/99/9999"
        isRequired
      />

      <ControlledSelect
        label="Status"
        name="status"
        control={control}
        errorMessage={errors.status?.message}
        options={status}
        placeHolder="Selecione um status"
        searchLabel="Pesquisar status"
        emptyLabel="Sem status cadastrados"
        isRequired
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
      />

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

      <Button
        disabled={isSubmitting}
        type="submit"
        className="sm:col-start-2 sm:h-fit sm:self-end"
      >
        Criar pedido
      </Button>
    </FormGrid>
  );
};

export const CreateSaleForm = memo(CreateSaleFormComponent);
