import { DataTable } from '@components/shared/dataTable';
import { FormGrid } from '@components/shared/formGrid/formGrid';
import { ControlledInput } from '@components/ui/inputs/controlledInput';
import { convertStatus } from '@utils/status';
import { nanoid } from 'nanoid';

import { TableCell, TableRow } from '@/components/ui/shadcn/table';

import { UserData } from './viewUserForm.types';

export const ViewUserForm = ({ user }: UserData) => {
  const columns = ['Código', 'Descrição'];

  const roles = user?.user_roles.map(role => (
    <TableRow key={nanoid()}>
      <TableCell>{role.id}</TableCell>
      <TableCell>{role.name}</TableCell>
    </TableRow>
  ));

  const permissions = user?.permissions.map(permission => (
    <TableRow key={nanoid()}>
      <TableCell>{permission.id}</TableCell>
      <TableCell>{permission.name}</TableCell>
    </TableRow>
  ));

  return (
    <FormGrid>
      <ControlledInput
        id="name"
        label="Nome:"
        value={user?.employee?.name}
        readOnly
      />
      <ControlledInput id="email" label="Email:" value={user?.email} readOnly />
      <ControlledInput id="user" label="Usuário:" value={user?.user} readOnly />
      <ControlledInput
        id="status"
        label="Status:"
        value={convertStatus(user?.status)}
        readOnly
      />

      {roles && roles.length > 0 && (
        <>
          <h1 className="text-black-80 dark:text-white-80 ">Papéis</h1>
          <div className="col-start-1 col-end-3">
            <DataTable columns={columns} emptyMessage="Nenhum papel vinculado.">
              {roles}
            </DataTable>
          </div>
        </>
      )}

      {permissions && permissions.length > 0 && (
        <>
          <h1 className="text-black-80 dark:text-white-80 ">Permissões</h1>
          <div className="col-start-1 col-end-3">
            <DataTable
              columns={columns}
              emptyMessage="Nenhuma permissão vinculada."
            >
              {permissions}
            </DataTable>
          </div>
        </>
      )}
    </FormGrid>
  );
};
