import { cookies } from 'next/headers';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { api } from '@axios';
import { UserTable } from '@features-components/administration/users/client/table/table';

import { TableSkeleton } from '@components/shared/skeleton/tableSkeleton/tableSkeleton';

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
      name: user?.employee?.name,
      cpf: user?.employee?.cpf,
    },
    user_roles: user.user_roles,
    permissions: user.permissions,
  }));
};

export const revalidate = 3600;

const getUsers = async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data } = await api.get<Users>('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message);
  }
};

export const metadata: Metadata = {
  title: 'Usuários',
};

const Users = async () => {
  const users = await getUsers();
  const rows = iterateResponse(users);
  return (
    <Suspense fallback={<TableSkeleton />}>
      <UserTable rows={rows} />
    </Suspense>
  );
};

export default Users;
