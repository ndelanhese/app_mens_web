import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { api } from '@axios';

const getUserData = async (id: string | undefined) => {
  if (!id) return redirect('/not-found');

  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;
    const { data: response } = await api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: Error | any) {
    redirect('/not-found');
  }
};

const UserPage = async ({
  params,
}: {
  params: { slugName: string; id: string };
}) => {
  const user = await getUserData(params.id);
  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
};

export default UserPage;
