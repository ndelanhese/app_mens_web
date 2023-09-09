import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { EditUserForm } from '@/components/features/administration/users/client/editUser/editUserForm';
import { api } from '@axios';

import { getFirstAndLastName } from '@utils/helpers/stringManipulation';

import { User, UserPageSearchParams } from './page.types';

const getUserData = async (id: string | undefined) => {
  if (!id) return redirect('/not-found');

  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data: response } = await api.get<User>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: Error | any) {
    redirect('/not-found');
  }
};

export const generateMetadata = async ({ params }: UserPageSearchParams) => {
  const userData = await getUserData(params.id);
  return {
    title: `${getFirstAndLastName(userData.employee.name)}`,
  };
};

const UserPage = async ({ params }: UserPageSearchParams) => {
  const userData = await getUserData(params.id);
  return (
    <div className="flex w-full items-center justify-center">
      <EditUserForm user={userData} />
    </div>
  );
};

export default UserPage;
