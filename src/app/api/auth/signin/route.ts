import { api } from '@axios';
import { z } from 'zod';

const signInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = signInBodySchema.parse(body);
    const { data } = await api.post('/auth/login', {
      email,
      password,
    });

    const permissions = JSON.stringify(data.permissions);
    const splitIndex = Math.floor(permissions.length / 2);

    const firstPermissions = permissions.slice(0, splitIndex);
    const secondPermissions = permissions.slice(splitIndex, permissions.length);

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 24);
    const expirationTimeInSeconds = Math.floor(
      (currentDate.getTime() - Date.now()) / 1000,
    );
    const TOKEN_COOKIE = `token=${data.token}; Path=/; Max-Age=${expirationTimeInSeconds};`;
    const USER_COOKIE = `user=${JSON.stringify(
      data.user_data,
    )}; Path=/; Max-Age=${expirationTimeInSeconds};`;

    const PERMISSION_ONE_COOKIE = `permission_one=${firstPermissions}; Path=/; Max-Age=${expirationTimeInSeconds};`;
    const PERMISSION_TWO_COOKIE = `permission_two=${secondPermissions}; Path=/; Max-Age=${expirationTimeInSeconds};`;
    const header = new Headers();
    header.append('Set-Cookie', TOKEN_COOKIE);
    header.append('Set-Cookie', USER_COOKIE);
    header.append('Set-Cookie', PERMISSION_ONE_COOKIE);
    header.append('Set-Cookie', PERMISSION_TWO_COOKIE);
    return Response.json(
      { message: 'Login realizado com sucesso!' },
      {
        status: 200,
        headers: header,
      },
    );
  } catch (error: any) {
    return Response.json(
      {
        message: error?.response?.data?.message ?? 'Erro ao realizar o login',
      },
      { status: 400 },
    );
  }
}
