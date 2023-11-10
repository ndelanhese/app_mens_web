import { Metadata } from 'next';

import { RolesTable } from '@components/features/administration/roles/client/table/table';

import { Roles } from './page.types';
import { getRoles } from './api';

export const metadata: Metadata = {
  title: 'Perfis de acesso',
};

const iterateResponse = (roles?: Roles) => {
  if (!roles) return [];
  return roles?.data?.map(role => ({
    id: role?.id,
    name: role?.name,
    description: role?.description,
  }));
};

const RolesPermissions = async () => {
  const users = await getRoles();
  const rows = iterateResponse(users);
  return <RolesTable rows={rows} />;
};

export default RolesPermissions;
