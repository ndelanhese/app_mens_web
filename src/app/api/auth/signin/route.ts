import { api } from '@axios';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const signInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

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
    const PERMISSION_COOKIE = `permission=${JSON.stringify(data.permissions)}; Path=/; Max-Age=${expirationTimeInSeconds};`;
    const header = new Headers();
    header.append('Set-Cookie', TOKEN_COOKIE);
    header.append('Set-Cookie', USER_COOKIE);
    header.append('Set-Cookie', PERMISSION_COOKIE);
    return NextResponse.json(
      { message: 'Login realizado com sucesso!' },
      {
        status: 200,
        headers: header,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.response?.data?.message ?? 'Erro ao realizar o login',
      },
      { status: 400 },
    );
  }
}
