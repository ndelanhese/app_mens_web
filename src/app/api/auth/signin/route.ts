import { NextRequest, NextResponse } from 'next/server'

import { api } from '@axios'

import { signInBodySchema } from './route.schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = signInBodySchema.parse(body)
    const { data } = await api.post('/auth/login', {
      email,
      password,
    })
    const redirectTo = request.cookies.get('redirectTo')?.value
    const redirectUrl = redirectTo ?? new URL('/', request.url)
    const TOKEN_COOKIE = `token=${data.token}; Path=/; max-age=${data.expires_in};`
    const USER_COOKIE = `user=${JSON.stringify(
      data.user_data,
    )}; Path=/; max-age=${data.expires_in};`
    // TODO -> Adicionar cookie de permissão
    // const PERMISSION_COOKIE = `permission=${response.permissao.profile}; Path=/; max-age=${ONE_DAY_IN_SECONDS}; HttpOnly;`
    const header = new Headers()
    header.append('Set-Cookie', TOKEN_COOKIE)
    header.append('Set-Cookie', USER_COOKIE)
    return NextResponse.redirect(redirectUrl, {
      headers: header,
    })
  } catch (error: Error | any) {
    return NextResponse.json(
      {
        message: error?.response?.data?.message ?? 'Erro ao realizar o login',
      },
      { status: 400 },
    )
  }
}
