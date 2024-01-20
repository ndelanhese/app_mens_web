import { RefModalProps } from '@components/shared/table/table.types';
import { ReactNode } from 'react';

type Employee = {
  id: number;
  name: string;
  cpf: string;
};

type role = {
  id: number;
  name: string;
};

type permission = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  email: string;
  phone: string;
  user: string;
  status: string;
  employee: Employee;
  user_roles: Array<role>;
  permissions: Array<permission>;
};

export type Employees = {
  id: number;
  name: string;
  cpf: string;
};

export type Roles = {
  id: number;
  description: string;
};

export type PermissionsGroup = {
  group_name: string;
  permissions: Array<{
    id: number;
    description: string;
  }>;
};

export type EditUserFormProps = {
  user: User | undefined;
  handleCloseModal: () => void;
};

export type CreatableSelects = 'roles';

export type NewItemModal = {
  newItemDialogTitle: string;
  newItemDialogDescription: string;
  newItemDialogContent: ReactNode;
  newItemDialogRef: (ref: RefModalProps) => void | undefined;
  newItemName: CreatableSelects;
};
