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

import { CreateRoleForm } from '../createRoleForm/createRoleForm';
import { EditRoleForm } from '../editRoleForm/editRoleForm';
import { ViewRoleForm } from '../viewRoleForm/viewRoleForm';
import { Role, RolesTableProps } from './table.types';

export const RolesTable = ({ rows }: RolesTableProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const { token } = parseCookies();

  const createRolesModalRef = useRef<RefModalProps | null>(null);
  const editRolesModalRef = useRef<RefModalProps | null>(null);

  const [selectedRoles, setSelectRoles] = useState<Role | undefined>(undefined);

  const tableColumns: Array<TableColumn<Role>> = useMemo(
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
          <TableColumnHeader column={column} title="Descrição" />
        ),
        accessorKey: 'description',
        id: 'Descrição',
      },
    ],
    [],
  );

  const handleDeleteItem = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/acl/roles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        router.refresh();
        toast({
          title: 'Perfil de acesso deletado com sucesso',
        });
      } catch (error: Error | any) {
        const message =
          error?.response?.data?.message ??
          'Erro ao deletar o perfil de acesso de acesso';
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
    async (row: Role, action: TableActionCallbackOptions) => {
      const { id, name } = row;

      setSelectRoles(row);

      if (action === 'delete') {
        if (name !== 'superadmin') {
          await handleDeleteItem(id);
        } else {
          toast({
            title: 'Ação indisponível',
            description: 'Não é possível deletar este papel',
            variant: 'destructive',
          });
        }
      }
    },
    [handleDeleteItem, toast],
  );

  const NEW_USER_TRIGGER = (
    <StyledDiv>
      Criar novo perfil
      <Plus className="h-4 w-4" />
    </StyledDiv>
  );

  const handleCloseNewRolesModal = useCallback(() => {
    createRolesModalRef.current?.close();
    router.refresh();
    setSelectRoles(undefined);
  }, [router]);

  const handleCloseEditRolesModal = useCallback(() => {
    editRolesModalRef.current?.close();
    router.refresh();
    setSelectRoles(undefined);
  }, [router]);

  return (
    <Table
      tableColumns={tableColumns}
      rows={rows}
      actionCallback={handleRowClick}
      newItemDialogContent={
        <CreateRoleForm handleCloseModal={handleCloseNewRolesModal} />
      }
      newItemTrigger={NEW_USER_TRIGGER}
      viewItemDialogTitle="Visualizar perfil de acesso"
      viewItemDialogDescription="Visualizar um perfil de acesso no sistema..."
      viewItemDialogContent={<ViewRoleForm role={selectedRoles} />}
      newItemDialogDescription="Criar um novo perfil de acesso no sistema."
      newItemDialogTitle="Criar novo perfil de acesso"
      newItemDialogRef={ref => {
        createRolesModalRef.current = ref;
      }}
      editItemDialogTitle="Editar perfil de acesso"
      editItemDialogDescription="Editar um perfil de acesso no sistema..."
      editItemDialogRef={ref => {
        editRolesModalRef.current = ref;
      }}
      editItemDialogContent={
        <EditRoleForm
          role={selectedRoles}
          handleCloseModal={handleCloseEditRolesModal}
        />
      }
      deleteItemTitle="Excluir perfil de acesso"
      deleteItemDescription="Deseja realmente excluir o perfil de acesso?"
    />
  );
};
