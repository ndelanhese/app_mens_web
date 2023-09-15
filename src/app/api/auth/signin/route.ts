import { NextRequest, NextResponse } from 'next/server';

import { api } from '@axios';

import { signInBodySchema } from './route.schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = signInBodySchema.parse(body);
    const { data } = await api.post('/auth/login', {
      email,
      password,
    });
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 24);
    const expirationTimeInSeconds = Math.floor(
      (currentDate.getTime() - Date.now()) / 1000,
    );
    const TOKEN_COOKIE = `token=${data.token}; Path=/; Max-Age=${expirationTimeInSeconds};`;
    const USER_COOKIE = `user=${JSON.stringify(
      data.user_data,
    )}; Path=/; Max-Age=${expirationTimeInSeconds};`;
    // TODO -> Adicionar cookie de permissão
    // const PERMISSION_COOKIE = `permission=${response.permissao.profile}; Path=/; Max-Age=${ONE_DAY_IN_SECONDS}; HttpOnly;`
    const header = new Headers();
    header.append('Set-Cookie', TOKEN_COOKIE);
    header.append('Set-Cookie', USER_COOKIE);
    return NextResponse.json(
      { message: 'Login realizado com sucesso!' },
      {
        status: 200,
        headers: header,
      },
    );
  } catch (error: Error | any) {
    return NextResponse.json(
      {
        message: error?.response?.data?.message ?? 'Erro ao realizar o login',
      },
      { status: 400 },
    );
  }
}
