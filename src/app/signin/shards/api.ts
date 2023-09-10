import { nextApi } from '@axios';

export const signin = async (email: string, password: string) => {
  return await nextApi.post('/auth/signin', {
    email,
    password,
  });
};
