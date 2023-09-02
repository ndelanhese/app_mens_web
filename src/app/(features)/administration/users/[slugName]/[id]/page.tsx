import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { api } from '@axios';

import { FormData } from '@components/features/administration/users/server/formData/formData';

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
    <div>
      <FormData user={userData} />
    </div>
  );
};

export default UserPage;
