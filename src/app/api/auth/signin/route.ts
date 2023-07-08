// import { api } from '@axios'
// import { tokenGenerator } from '@utils/token'
// import { NextRequest, NextResponse } from 'next/server'
// import { loginBodySchema } from './route.schema'

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { cpfCnpj, password } = loginBodySchema.parse(body)
//     const { data } = await api.post('/login', {
//       cpfcnpj: cpfCnpj,
//       password,
//     })
//     const redirectTo = request.cookies.get('redirectTo')?.value
//     const [response] = data
//     const token = tokenGenerator(response)
//     const redirectUrl = redirectTo ?? new URL('/', request.url)
//     const ONE_DAY_IN_SECONDS = 60 * 60 * 24
//     const TOKEN_COOKIE = `token=${token}; Path=/; max-age=${ONE_DAY_IN_SECONDS};`
//     const PERMISSION_COOKIE = `permission=${response.permissao.profile}; Path=/; max-age=${ONE_DAY_IN_SECONDS}; HttpOnly;`
//     const header = new Headers()
//     header.append('Set-Cookie', TOKEN_COOKIE)
//     header.append('Set-Cookie', PERMISSION_COOKIE)
//     return NextResponse.redirect(redirectUrl, {
//       headers: header,
//     })
//   } catch (error: Error | any) {
//     return NextResponse.json(
//       {
//         message: error?.response?.data?.message ?? 'Erro ao realizar o login',
//       },
//       { status: 400 },
//     )
//   }
// }
