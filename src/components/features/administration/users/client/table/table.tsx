'use client';

import { api } from '@axios';
import { Table } from '@components/shared/table/table';
import {
  RefModalProps,
  TableActionCallbackOptions,
  TableColumn,
} from '@components/shared/table/table.types';
import { TableColumnHeader } from '@components/shared/table/tableColumnHeader';
import { useToast } from '@components/ui/shadcn/toast/use-toast';
import { StyledDiv } from '@components/ui/styledDiv/styledDiv';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useCallback, useMemo, useRef, useState } from 'react';

import { ViewUserForm } from '../../server/viewUserForm/viewUserForm';
import { CreateUserForm } from '../createUserForm/createUserForm';
import { EditUserForm } from '../editUserForm/editUserForm';
import { User, UserTableProps } from './table.types';

export const UserTable = ({ rows }: UserTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createUserModalRef = useRef<RefModalProps | null>(null);
  const editUserModalRef = useRef<RefModalProps | null>(null);

  const [selectedUser, setSelectUser] = useState<User | undefined>(undefined);

  const tableColumns: Array<TableColumn<User>> = useMemo(
    () => [
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Código" />
        ),
        accessorKey: 'id',
        id: 'Código',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Nome" />
        ),
        accessorKey: 'employee.name',
        id: 'Nome',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="CPF" />
        ),
        accessorKey: 'employee.cpf',
        id: 'CPF',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="E-mail" />
        ),
        accessorKey: 'email',
        id: 'E-mail',
      },
      {
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Celular" />
        ),
        accessorKey: 'phone',
        id: 'Celular',
      },
    ],
    [],
  );

  const handleDeleteItem = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.refresh();
        toast({
          title: 'Usuário deletado com sucesso',
        });
      } catch (error: Error | any) {
        const message =
          error?.response?.data?.message ?? 'Erro ao deletar o usuário';
        toast({
          title: 'Erro ao deletar',
          description: message,
          variant: 'destructive',
        });
      }
    },
    [router, toast, token],
  );

  const handleRowClick = useCallback(
    async (row: User, action: TableActionCallbackOptions) => {
      const { id } = row;
      setSelectUser(row);

      if (action === 'delete') {
        await handleDeleteItem(id);
      }
    },
    [handleDeleteItem],
  );

  const NEW_USER_TRIGGER = (
    <StyledDiv>
      Criar novo usuário
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewUserModal = useCallback(() => {
    createUserModalRef.current?.close();
    setSelectUser(undefined);
    router.refresh();
  }, [router]);

  const handleCloseEditUserModal = useCallback(() => {
    editUserModalRef.current?.close();
    setSelectUser(undefined);
    router.refresh();
  }, [router]);

  return (
    <Table
      tableColumns={tableColumns}
      rows={rows}
      actionCallback={handleRowClick}
      newItemDialogContent={
        <CreateUserForm handleCloseModal={handleCloseNewUserModal} />
      }
      newItemTrigger={NEW_USER_TRIGGER}
      viewItemDialogTitle="Visualizar usuário"
      viewItemDialogDescription="Visualizar um usuário no sistema..."
      viewItemDialogContent={<ViewUserForm user={selectedUser} />}
      newItemDialogDescription="Criar um novo usuário no sistema."
      newItemDialogTitle="Criar novo usuário"
      newItemDialogRef={ref => {
        createUserModalRef.current = ref;
      }}
      editItemDialogTitle="Editar usuário"
      editItemDialogDescription="Editar um usuário no sistema..."
      editItemDialogRef={ref => {
        editUserModalRef.current = ref;
      }}
      editItemDialogContent={
        <EditUserForm
          user={selectedUser}
          handleCloseModal={handleCloseEditUserModal}
        />
      }
      deleteItemTitle="Excluir usuário"
      deleteItemDescription="Deseja realmente excluir o usuário?"
      permissionPrefix="users"
    />
  );
};
