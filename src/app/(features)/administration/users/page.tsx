import { Metadata } from 'next';

import { UserTable } from '@features-components/administration/users/client/table/table';

import { getUsers } from './api';
import { Users } from './page.types';

const iterateResponse = (users?: Users) => {
  if (!users) return [];
  return users?.data?.map(user => ({
    id: user?.id,
    email: user?.email,
    phone: user?.employee?.phone,
    user: user?.user,
    status: user?.status,
    employee: {
      id: user?.employee?.id,
      name: user?.employee?.name,
      cpf: user?.employee?.cpf,
    },
    user_roles: user.user_roles,
    permissions: user.permissions,
  }));
};

export const metadata: Metadata = {
  title: 'Usuários',
};

const Users = async () => {
  const users = await getUsers();
  const rows = iterateResponse(users);
  return <UserTable rows={rows} />;
};

export default Users;
