import { Permissions } from './permissions.types';

const convertPermissionsToJSON = (permissions: string) => {
  return JSON.parse(permissions) as Permissions;
};

export const validateIfTheUserHasPermission = (
  permissionName: string,
  userPermissions: string,
) => {
  if (!userPermissions) return false;
  const permissions = convertPermissionsToJSON(userPermissions);

  return permissions.some(permission => permission.name === permissionName);
};

export const validateIfTheUseCanSeeThePath = (
  path: string,
  userPermissions: string | undefined,
) => {
  if (!userPermissions) return false;
  const permissions = convertPermissionsToJSON(userPermissions);

  let permissionName: string;

  switch (path) {
    case '/dashboard':
      permissionName = 'summaries_read';
      break;
    case '/administration/users':
      permissionName = 'users_read';
      break;
    case '/administration/roles-permissions':
      permissionName = 'acl_read';
      break;
    case '/data-management/brands':
      permissionName = 'brands_read';
      break;
    case '/data-management/categories':
      permissionName = 'categories_read';
      break;
    case '/customers/customers':
      permissionName = 'customers_read';
      break;
    case '/data-management/products':
      permissionName = 'products_read';
      break;
    case '/customers/orders':
      permissionName = 'orders_read';
      break;
    case '/customers/sales':
      permissionName = 'sales_read';
      break;
    case '/employees/employees':
      permissionName = 'employees_read';
      break;
    case '/employees/suppliers':
      permissionName = 'suppliers_read';
      break;
    case '/promotions/promotion-categories':
      permissionName = 'promotions_categories_read';
      break;
    case '/promotions/promotions':
      permissionName = 'promotions_read';
      break;
    default:
      return false;
  }

  return permissions.some(permission => permission.name === permissionName);
};
